import {
  getEnergyUsageOfHousehold,
  HouseholdEnergyUsage,
  HouseholdType,
} from "./householdEnergyUsage";

describe("householdEnergyUsage", () => {
  describe("getEnergyUsageOfHousehold", () => {
    const mockEnergyUsage: HouseholdEnergyUsage = {
      Time: "2023-10-01T00:00:00Z",
      Standard_Household: 1500,
      HeatPump_Household: 2000,
      HeatPump_Battery_Household: 2500,
    };

    it("should return energy usage for a STANDARD household type", () => {
      const result = getEnergyUsageOfHousehold(mockEnergyUsage, "STANDARD");
      expect(result).toBe(1500);
    });

    it("should return energy usage for a HEAT_PUMP household type", () => {
      const result = getEnergyUsageOfHousehold(mockEnergyUsage, "HEAT_PUMP");
      expect(result).toBe(2000);
    });

    it("should return energy usage for a HEAT_PUMP_BATTERY household type", () => {
      const result = getEnergyUsageOfHousehold(
        mockEnergyUsage,
        "HEAT_PUMP_BATTERY",
      );
      expect(result).toBe(2500);
    });

    it("should throw an error for an invalid household type", () => {
      expect(() =>
        getEnergyUsageOfHousehold(mockEnergyUsage, "INVALID" as HouseholdType),
      ).toThrow();
    });
  });
});
