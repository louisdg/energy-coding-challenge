export function formatCurrency(
  monetaryValueInPence: number | null | undefined,
): string | null {
  if (monetaryValueInPence === null || monetaryValueInPence === undefined) {
    return null;
  }

  return (monetaryValueInPence / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}
