import roundToDecimal from "./roundToDecimal";

describe("roundToDecimal", () => {
  it("should round a number to the specified number of decimal places", () => {
    expect(roundToDecimal(1.23456, 2)).toBe(1.23);
  });

  it("should round up correctly when necessary", () => {
    expect(roundToDecimal(1.235, 2)).toBe(1.24);
  });

  it("should handle rounding to 0 decimals", () => {
    expect(roundToDecimal(1.7, 0)).toBe(2);
  });

  it("should handle negative numbers correctly", () => {
    expect(roundToDecimal(-1.23456, 2)).toBe(-1.23);
  });

  it("should handle large decimal places", () => {
    expect(roundToDecimal(1.0000001234, 8)).toBe(1.00000012);
  });

  it("should return the same number when decimals is set to a large value for an integer", () => {
    expect(roundToDecimal(5, 10)).toBe(5);
  });

  it("should throw an error when decimals is negative", () => {
    expect(() => roundToDecimal(1.234, -1)).toThrow("Decimals must be positive");
  });
});