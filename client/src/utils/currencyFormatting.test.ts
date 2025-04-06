import { formatCurrency } from "./currencyFormatting";

describe("formatCurrency", () => {
  it("should return null if monetaryValueInPence is undefined", () => {
    expect(formatCurrency(undefined)).toBeNull();
  });

  it("should format a simple currency value in pence", () => {
    expect(formatCurrency(12345)).toBe("£123.45");
  });

  it("should handle zero pence correctly", () => {
    expect(formatCurrency(0)).toBe("£0.00");
  });

  it("should keep up to four fractional pence", () => {
    expect(formatCurrency(12340.67)).toBe("£123.4067");
  });

  it("should round down when more than four fractional pence", () => {
    expect(formatCurrency(12340.673)).toBe("£123.4067");
  });

  it("should round up when more than four fractional pence", () => {
    expect(formatCurrency(12340.678)).toBe("£123.4068");
  });

  it("should handle large currency values", () => {
    expect(formatCurrency(10000000)).toBe("£100,000.00");
  });

  it("should format negative currency values", () => {
    expect(formatCurrency(-12345)).toBe("-£123.45");
  });
});
