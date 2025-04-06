import {
  calculateAverage,
  calculateMaximum,
  calculateMinimum,
} from "./statCalculations";

describe("calculateAverage", () => {
  it("should return the correct average for a list of positive numbers", () => {
    const stats = [10, 20, 30];
    const result = calculateAverage(stats);
    expect(result).toBe(20);
  });

  it("should return the correct average for a list of negative numbers", () => {
    const stats = [-10, -20, -30];
    const result = calculateAverage(stats);
    expect(result).toBe(-20);
  });

  it("should return the correct average for a mixed list of positive and negative numbers", () => {
    const stats = [10, -20, 30];
    const result = calculateAverage(stats);
    expect(result).toBe(6.666666666666667);
  });

  it("should return the correct average for a single-element list", () => {
    const stats = [42];
    const result = calculateAverage(stats);
    expect(result).toBe(42);
  });

  it("should throw an error for an empty list", () => {
    const stats: number[] = [];
    expect(() => calculateAverage(stats)).toThrow();
  });
});

describe("calculateMinimum", () => {
  it("should return the correct minimum value for a list of positive numbers", () => {
    const stats = [10, 20, 30];
    const result = calculateMinimum(stats);
    expect(result).toBe(10);
  });

  it("should return the correct minimum value for a list of negative numbers", () => {
    const stats = [-10, -20, -30];
    const result = calculateMinimum(stats);
    expect(result).toBe(-30);
  });

  it("should return the correct minimum value for a mixed list of positive and negative numbers", () => {
    const stats = [10, -20, 30, -5];
    const result = calculateMinimum(stats);
    expect(result).toBe(-20);
  });

  it("should return the only value in a single-element list", () => {
    const stats = [42];
    const result = calculateMinimum(stats);
    expect(result).toBe(42);
  });

  it("should throw an error for an empty list", () => {
    const stats: number[] = [];
    expect(() => calculateMinimum(stats)).toThrow();
  });
});

describe("calculateMaximum", () => {
  it("should return the correct maximum value for a list of positive numbers", () => {
    const stats = [10, 20, 30];
    const result = calculateMaximum(stats);
    expect(result).toBe(30);
  });

  it("should return the correct maximum value for a list of negative numbers", () => {
    const stats = [-10, -20, -30];
    const result = calculateMaximum(stats);
    expect(result).toBe(-10);
  });

  it("should return the correct maximum value for a mixed list of positive and negative numbers", () => {
    const stats = [10, -20, 30, -5];
    const result = calculateMaximum(stats);
    expect(result).toBe(30);
  });

  it("should return the only value in a single-element list", () => {
    const stats = [42];
    const result = calculateMaximum(stats);
    expect(result).toBe(42);
  });

  it("should throw an error for an empty list", () => {
    const stats: number[] = [];
    expect(() => calculateMaximum(stats)).toThrow();
  });
});
