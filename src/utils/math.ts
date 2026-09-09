import { SimulationResult } from '../types';

export function computeDensity(x: number, a: number, b: number): number {
  if (b <= a) return 0;
  if (x >= a && x <= b) {
    return 1 / (b - a);
  }
  return 0;
}

export function computeCDF(x: number, a: number, b: number): number {
  if (b <= a) return 0;
  if (x < a) return 0;
  if (x > b) return 1;
  return (x - a) / (b - a);
}

export function runSimulation(count: number, a: number, b: number, selectedX: number): SimulationResult {
  const times: number[] = [];
  let sum = 0;
  let underCount = 0;

  for (let i = 0; i < count; i++) {
    // Uniform random variable ~ U(a, b)
    const val = a + Math.random() * (b - a);
    times.push(val);
    sum += val;
    if (val <= selectedX) {
      underCount++;
    }
  }

  const mean = sum / count;
  const observedProbability = underCount / count;
  const theoreticalProbability = computeCDF(selectedX, a, b);

  // Generate 8 histogram bins across [a, b]
  const numBins = 8;
  const binWidth = (b - a) / numBins;
  const bins: SimulationResult['bins'] = [];

  for (let i = 0; i < numBins; i++) {
    const rangeStart = a + i * binWidth;
    const rangeEnd = a + (i + 1) * binWidth;
    // For the last bin, include the upper edge
    const binTimes = times.filter((t) =>
      i === numBins - 1 ? t >= rangeStart && t <= rangeEnd : t >= rangeStart && t < rangeEnd
    );
    bins.push({
      rangeStart,
      rangeEnd,
      count: binTimes.length,
      percentage: (binTimes.length / count) * 100,
    });
  }

  return {
    times,
    count,
    mean,
    countUnderOrEqualX: underCount,
    observedProbability,
    theoreticalProbability,
    bins,
  };
}

// Convert a number to clean fraction string if close to simple fractions
export function formatFraction(numerator: number, denominator: number): string {
  // Greatest common divisor
  const gcd = (x: number, y: number): number => {
    let a = Math.round(Math.abs(x) * 100);
    let b = Math.round(Math.abs(y) * 100);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a / 100;
  };

  const roundedNum = Math.round(numerator * 100) / 100;
  const roundedDen = Math.round(denominator * 100) / 100;
  
  return `${roundedNum} / ${roundedDen}`;
}
