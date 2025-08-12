export enum EnumSpinnerType {
  GRADIENT_PULSE = 'gradient-pulse',
  RAINBOW_RING = 'rainbow-ring',
  DOTS_WAVE = 'dots-wave',
  MORPHING_SQUARES = 'morphing-squares',
  AURORA_SPIN = 'aurora-spin',
  PARTICLE_ORBIT = 'particle-orbit',
}

export interface SpinnerType {
  id: EnumSpinnerType;
  name: string;
}