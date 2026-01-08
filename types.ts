
export interface SimulationState {
  m1: number; // mass of elevator
  m2: number; // mass of counterweight
  g: number;  // gravity
  a: number;  // calculated acceleration
  T: number;  // calculated tension
  isPlaying: boolean;
  position: number; 
  velocity: number;
}

export enum TutorialStep {
  SETUP = 0,
  ANALYSIS = 1,
  SOLVE = 2,
  SIMULATE = 3
}
