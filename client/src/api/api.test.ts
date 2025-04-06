import api from "./api.ts";

describe("api", () => {
  it("should initialize APIs", () => {
    expect(api.energyPrices).toBeDefined();
    expect(api.householdEnergyUsage).toBeDefined();
    expect(api.flexibilityOpportunities).toBeDefined();
    expect(api.insights).toBeDefined();
  });
});
