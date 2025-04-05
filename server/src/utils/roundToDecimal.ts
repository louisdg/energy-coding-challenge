export default function roundToDecimal(value: number, decimals: number) {
  if (decimals < 0) {
    throw new Error("Decimals must be positive");
  }

  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
