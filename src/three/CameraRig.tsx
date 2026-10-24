import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { damp3, damp } from "maath/easing";
import { getActiveKeyframe, CAMERA_KEYFRAMES } from "./cameraScript";
import { getScrollProgress } from "../utils/useScrollProgress";
import { pulseBus } from "../utils/pulseBus";

interface CameraRigProps {
  onFocusChange?: (focus: number) => void;
  onShotChange?: (shot: string, actTitle: string, actNumber: string) => void;
  isReducedMotion?: boolean;
}

export function CameraRig({
  onFocusChange,
  onShotChange,
  isReducedMotion = false
}: CameraRigProps) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0.4, 4.6));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const lastActIndex = useRef(-1);

  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 0.4, 4.6);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((state, delta) => {
    const progress = getScrollProgress();
    const { current, next, actProgress } = getActiveKeyframe(progress);

    // Act boundary notification for red pulse
    const actIdx = CAMERA_KEYFRAMES.findIndex((k) => k.id === current.id);
    if (actIdx !== lastActIndex.current && actIdx !== -1) {
      lastActIndex.current = actIdx;
      pulseBus.emit(actIdx);
    }

    // Inform parent of shot label and active act
    if (onShotChange) {
      onShotChange(current.shot, current.actTitle, current.actNumber);
    }

    // Interpolate keyframe target position between current and next
    const pStart = current.positionStart;
    const pEnd = current.positionEnd;
    const targetX = pStart[0] + (pEnd[0] - pStart[0]) * actProgress;
    const targetY = pStart[1] + (pEnd[1] - pStart[1]) * actProgress;
    const targetZ = pStart[2] + (pEnd[2] - pStart[2]) * actProgress;

    // Handheld camera shake at 0.3 Hz, amplitude 0.02 (disabled under reduced motion)
    let shakeX = 0;
    let shakeY = 0;
    if (!isReducedMotion) {
      const t = state.clock.getElapsedTime();
      shakeX = Math.sin(t * 1.88) * 0.02;
      shakeY = Math.cos(t * 1.57) * 0.018;
    }

    targetPos.current.set(targetX + shakeX, targetY + shakeY, targetZ);

    // Mouse parallax (subtle damping)
    if (!isReducedMotion) {
      targetPos.current.x += state.pointer.x * 0.15;
      targetPos.current.y += state.pointer.y * 0.12;
    }

    // Ease camera position with damp3 (lambda 2.5)
    damp3(camera.position, targetPos.current, 2.5, delta);

    // Interpolate lookAt
    targetLook.current.set(...current.lookAt);
    damp3(currentLook.current, targetLook.current, 4.0, delta);
    camera.lookAt(currentLook.current);

    // FOV dolly-zoom: eases 55 -> 65 across scroll
    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = current.fov + progress * 5;
      damp(camera, "fov", targetFov, 2.5, delta);
      camera.updateProjectionMatrix();
    }

    // Dynamic focus distance
    const interpolatedFocus =
      current.focusDistance + (next.focusDistance - current.focusDistance) * actProgress;
    if (onFocusChange) {
      onFocusChange(interpolatedFocus);
    }
  });

  return null;
}
