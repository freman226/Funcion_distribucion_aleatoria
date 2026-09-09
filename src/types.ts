export interface DistributionConfig {
  minTime: number; // a, default 1
  maxTime: number; // b, default 5
  selectedX: number; // x, default 3
}

export interface SimulationResult {
  times: number[];
  count: number;
  mean: number;
  countUnderOrEqualX: number;
  observedProbability: number;
  theoreticalProbability: number;
  bins: {
    rangeStart: number;
    rangeEnd: number;
    count: number;
    percentage: number;
  }[];
}
