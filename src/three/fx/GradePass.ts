/**
 * Color grading tint per Act:
 * Hero leans deep red, About leans cool slate, Vault leans cold white, Contact fades to near-black.
 * Strength max ±6%.
 */
export interface GradeProfile {
  tintR: number;
  tintG: number;
  tintB: number;
  contrast: number;
}

export const ACT_GRADES: Record<string, GradeProfile> = {
  ACT_01_HERO: { tintR: 1.05, tintG: 0.97, tintB: 0.97, contrast: 1.04 },
  ACT_02_ABOUT: { tintR: 0.98, tintG: 1.01, tintB: 1.05, contrast: 1.02 },
  ACT_03_STACK: { tintR: 1.02, tintG: 0.98, tintB: 1.02, contrast: 1.03 },
  ACT_04_PROJECTS: { tintR: 1.04, tintG: 0.98, tintB: 0.98, contrast: 1.04 },
  ACT_05_EXPERIENCE: { tintR: 1.02, tintG: 1.00, tintB: 0.98, contrast: 1.02 },
  ACT_06_CREDENTIALS: { tintR: 1.01, tintG: 1.02, tintB: 1.04, contrast: 1.03 },
  ACT_07_EDUCATION: { tintR: 1.00, tintG: 1.00, tintB: 1.02, contrast: 1.02 },
  ACT_08_CONTACT: { tintR: 0.96, tintG: 0.95, tintB: 0.97, contrast: 1.06 },
};
