/**
 * Single source of truth for 3D coordinate space across all 8 Acts.
 * Prevents camera framing and scene anchor drift.
 */
export interface SceneAnchor {
  position: [number, number, number];
  rotation?: [number, number, number];
}

export const WORLD_COORDS = {
  ACT_01_HERO: {
    origin: [0, 0, 0] as [number, number, number],
    cameraStart: [0, 0.4, 4.6] as [number, number, number],
    cameraEnd: [0, 0.1, 3.4] as [number, number, number],
    lookAt: [0, 0, 0] as [number, number, number],
  },
  ACT_02_ABOUT: {
    origin: [0, -18, -4] as [number, number, number],
    cameraStart: [2.5, -17.5, 1.2] as [number, number, number],
    cameraEnd: [-1.8, -18.2, 0.8] as [number, number, number],
    lookAt: [0, -18, -4] as [number, number, number],
  },
  ACT_03_STACK: {
    origin: [0, -36, -8] as [number, number, number],
    cameraStart: [0, -35.2, -2.5] as [number, number, number],
    cameraEnd: [0, -36.0, -4.8] as [number, number, number],
    lookAt: [0, -36, -8] as [number, number, number],
  },
  ACT_04_PROJECTS: {
    origin: [0, -56, -2] as [number, number, number],
    cameraStart: [-3.0, -55.8, 3.8] as [number, number, number],
    cameraEnd: [3.0, -56.2, 3.6] as [number, number, number],
    lookAt: [0, -56, -2] as [number, number, number],
  },
  ACT_05_EXPERIENCE: {
    origin: [0, -76, -6] as [number, number, number],
    cameraStart: [1.8, -75.5, -1.8] as [number, number, number],
    cameraEnd: [0.2, -76.1, -2.4] as [number, number, number],
    lookAt: [0, -76, -6] as [number, number, number],
  },
  ACT_06_CREDENTIALS: {
    origin: [0, -96, -4] as [number, number, number],
    cameraStart: [-2.0, -97.2, 1.5] as [number, number, number],
    cameraEnd: [0, -94.8, 1.0] as [number, number, number],
    lookAt: [0, -96, -4] as [number, number, number],
  },
  ACT_07_EDUCATION: {
    origin: [0, -116, -6] as [number, number, number],
    cameraStart: [0, -114.5, -1.2] as [number, number, number],
    cameraEnd: [0, -116.0, -1.8] as [number, number, number],
    lookAt: [0, -116, -6] as [number, number, number],
  },
  ACT_08_CONTACT: {
    origin: [0, -136, 0] as [number, number, number],
    cameraStart: [0, -135.8, 3.2] as [number, number, number],
    cameraEnd: [0, -134.5, 7.8] as [number, number, number],
    lookAt: [0, -136, 0] as [number, number, number],
  },
} as const;
