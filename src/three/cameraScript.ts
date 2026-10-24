import { WORLD_COORDS } from "./world";

export interface CameraKeyframe {
  id: string;
  actNumber: string;
  actTitle: string;
  scrollStart: number;
  scrollEnd: number;
  positionStart: [number, number, number];
  positionEnd: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  focusDistance: number;
  shot: string;
}

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    id: "ACT_01_HERO",
    actNumber: "01",
    actTitle: "ORIGIN",
    scrollStart: 0.00,
    scrollEnd: 0.10,
    positionStart: WORLD_COORDS.ACT_01_HERO.cameraStart,
    positionEnd: WORLD_COORDS.ACT_01_HERO.cameraEnd,
    lookAt: WORLD_COORDS.ACT_01_HERO.lookAt,
    fov: 55,
    focusDistance: 0.02,
    shot: "WIDE · DOLLY IN"
  },
  {
    id: "ACT_02_ABOUT",
    actNumber: "02",
    actTitle: "OBSERVATORY",
    scrollStart: 0.10,
    scrollEnd: 0.22,
    positionStart: WORLD_COORDS.ACT_02_ABOUT.cameraStart,
    positionEnd: WORLD_COORDS.ACT_02_ABOUT.cameraEnd,
    lookAt: WORLD_COORDS.ACT_02_ABOUT.lookAt,
    fov: 56,
    focusDistance: 0.12,
    shot: "ORBIT · SLOW"
  },
  {
    id: "ACT_03_STACK",
    actNumber: "03",
    actTitle: "DATA CATHEDRAL",
    scrollStart: 0.22,
    scrollEnd: 0.34,
    positionStart: WORLD_COORDS.ACT_03_STACK.cameraStart,
    positionEnd: WORLD_COORDS.ACT_03_STACK.cameraEnd,
    lookAt: WORLD_COORDS.ACT_03_STACK.lookAt,
    fov: 58,
    focusDistance: 0.18,
    shot: "PUSH IN · CORRIDOR"
  },
  {
    id: "ACT_04_PROJECTS",
    actNumber: "04",
    actTitle: "GALLERY",
    scrollStart: 0.34,
    scrollEnd: 0.52,
    positionStart: WORLD_COORDS.ACT_04_PROJECTS.cameraStart,
    positionEnd: WORLD_COORDS.ACT_04_PROJECTS.cameraEnd,
    lookAt: WORLD_COORDS.ACT_04_PROJECTS.lookAt,
    fov: 60,
    focusDistance: 0.25,
    shot: "TRACK · LATERAL"
  },
  {
    id: "ACT_05_EXPERIENCE",
    actNumber: "05",
    actTitle: "CHRONICLE",
    scrollStart: 0.52,
    scrollEnd: 0.62,
    positionStart: WORLD_COORDS.ACT_05_EXPERIENCE.cameraStart,
    positionEnd: WORLD_COORDS.ACT_05_EXPERIENCE.cameraEnd,
    lookAt: WORLD_COORDS.ACT_05_EXPERIENCE.lookAt,
    fov: 58,
    focusDistance: 0.10,
    shot: "CLOSE-UP · RACK FOCUS"
  },
  {
    id: "ACT_06_CREDENTIALS",
    actNumber: "06",
    actTitle: "VAULT",
    scrollStart: 0.62,
    scrollEnd: 0.74,
    positionStart: WORLD_COORDS.ACT_06_CREDENTIALS.cameraStart,
    positionEnd: WORLD_COORDS.ACT_06_CREDENTIALS.cameraEnd,
    lookAt: WORLD_COORDS.ACT_06_CREDENTIALS.lookAt,
    fov: 62,
    focusDistance: 0.30,
    shot: "CRANE · UP"
  },
  {
    id: "ACT_07_EDUCATION",
    actNumber: "07",
    actTitle: "FOUNDATION",
    scrollStart: 0.74,
    scrollEnd: 0.84,
    positionStart: WORLD_COORDS.ACT_07_EDUCATION.cameraStart,
    positionEnd: WORLD_COORDS.ACT_07_EDUCATION.cameraEnd,
    lookAt: WORLD_COORDS.ACT_07_EDUCATION.lookAt,
    fov: 59,
    focusDistance: 0.08,
    shot: "SPOTLIGHT · PILLAR"
  },
  {
    id: "ACT_08_CONTACT",
    actNumber: "08",
    actTitle: "SIGNAL",
    scrollStart: 0.84,
    scrollEnd: 1.00,
    positionStart: WORLD_COORDS.ACT_08_CONTACT.cameraStart,
    positionEnd: WORLD_COORDS.ACT_08_CONTACT.cameraEnd,
    lookAt: WORLD_COORDS.ACT_08_CONTACT.lookAt,
    fov: 65,
    focusDistance: 0.40,
    shot: "PULL BACK · REVEAL"
  }
];

export function getActiveKeyframe(progress: number): {
  current: CameraKeyframe;
  next: CameraKeyframe;
  actProgress: number;
} {
  const clamped = Math.max(0, Math.min(0.9999, progress));
  let idx = CAMERA_KEYFRAMES.findIndex(
    (kf) => clamped >= kf.scrollStart && clamped < kf.scrollEnd
  );
  if (idx === -1) idx = CAMERA_KEYFRAMES.length - 1;

  const current = CAMERA_KEYFRAMES[idx];
  const next = CAMERA_KEYFRAMES[Math.min(idx + 1, CAMERA_KEYFRAMES.length - 1)];
  const span = current.scrollEnd - current.scrollStart;
  const actProgress = span > 0 ? (clamped - current.scrollStart) / span : 0;

  return { current, next, actProgress };
}
