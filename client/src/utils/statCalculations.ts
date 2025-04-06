export function calculateAverage(stats: number[]): number {
  if (stats.length === 0) {
    throw new Error("Cannot calculate average of empty array");
  }

  return stats.reduce((average, stat) => average + stat, 0) / stats.length;
}

export function calculateMinimum(stats: number[]): number {
  if (stats.length === 0) {
    throw new Error("Cannot calculate minimum of empty array");
  }

  return stats.reduce((minimum, stat) => (minimum > stat ? stat : minimum));
}

export function calculateMaximum(stats: number[]): number {
  if (stats.length === 0) {
    throw new Error("Cannot calculate maximum of empty array");
  }

  return stats.reduce((maximum, stat) => (maximum < stat ? stat : maximum));
}
