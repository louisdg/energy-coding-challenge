import {
  getHouseholdEnergyUsageData,
  getPeakEnergyUsageAcrossHouseholds,
  getTotalEnergyUsageForHouseholdType,
} from "./householdEnergyUsageService";

describe("householdEnergyUsageService", () => {
  describe("getTotalEnergyUsageForHouseholdType", () => {
    it.each([
      { householdType: "STANDARD", expectedTotal: 17.6 },
      { householdType: "HEAT_PUMP", expectedTotal: 35.3 },
      { householdType: "HEAT_PUMP_BATTERY", expectedTotal: 35.1 },
    ] as const)(
      "should return the total energy usage for a $householdType household",
      async ({ householdType, expectedTotal }) => {
        const totalEnergyUsageForHouseholdType =
          await getTotalEnergyUsageForHouseholdType(householdType);
        expect(totalEnergyUsageForHouseholdType).toEqual(expectedTotal);
      },
    );
  });

  describe("getPeakEnergyUsageAcrossHouseholds", () => {
    it("should return null if there is not data for that date", async () => {
      const globalEnergyUsage = await getPeakEnergyUsageAcrossHouseholds();
      expect(globalEnergyUsage).toEqual({ time: "02:30", usageInKwh: 5.6 });
    });
  });

  describe("getHouseholdEnergyUsageData", () => {
    it("should return the household energy usage data", async () => {
      const householdEnergyUsageData = await getHouseholdEnergyUsageData();
      expect(householdEnergyUsageData).toEqual([
        {
          Time: "00:00",
          Standard_Household: 0.4,
          HeatPump_Household: 0.6,
          HeatPump_Battery_Household: 0.6,
        },
        {
          Time: "00:30",
          Standard_Household: 0.3,
          HeatPump_Household: 0.5,
          HeatPump_Battery_Household: 0.5,
        },
        {
          Time: "01:00",
          Standard_Household: 0.3,
          HeatPump_Household: 0.5,
          HeatPump_Battery_Household: 0.5,
        },
        {
          Time: "01:30",
          Standard_Household: 0.3,
          HeatPump_Household: 0.5,
          HeatPump_Battery_Household: 0.5,
        },
        {
          Time: "02:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0.5,
        },
        {
          Time: "02:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 5,
        },
        {
          Time: "03:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 5,
        },
        {
          Time: "03:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 5,
        },
        {
          Time: "04:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "04:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "05:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "05:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "06:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "06:30",
          Standard_Household: 0.2,
          HeatPump_Household: 1.5,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "07:00",
          Standard_Household: 0.2,
          HeatPump_Household: 1.5,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "07:30",
          Standard_Household: 0.2,
          HeatPump_Household: 1.5,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "08:00",
          Standard_Household: 0.2,
          HeatPump_Household: 1.5,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "08:30",
          Standard_Household: 0.2,
          HeatPump_Household: 1.5,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "09:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "09:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "10:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "10:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "11:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "11:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "12:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.2,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "12:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.2,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "13:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.2,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "13:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.2,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "14:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "14:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 5,
        },
        {
          Time: "15:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 5,
        },
        {
          Time: "15:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 5,
        },
        {
          Time: "16:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "16:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "17:00",
          Standard_Household: 0.2,
          HeatPump_Household: 1.5,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "17:30",
          Standard_Household: 0.8,
          HeatPump_Household: 1.5,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "18:00",
          Standard_Household: 1.2,
          HeatPump_Household: 2,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "18:30",
          Standard_Household: 1.5,
          HeatPump_Household: 2.2,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "19:00",
          Standard_Household: 1.4,
          HeatPump_Household: 2,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "19:30",
          Standard_Household: 1.2,
          HeatPump_Household: 1.8,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "20:00",
          Standard_Household: 0.9,
          HeatPump_Household: 1.6,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "20:30",
          Standard_Household: 0.7,
          HeatPump_Household: 1.4,
          HeatPump_Battery_Household: 0,
        },
        {
          Time: "21:00",
          Standard_Household: 0.5,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0.4,
        },
        {
          Time: "21:30",
          Standard_Household: 0.5,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0.4,
        },
        {
          Time: "22:00",
          Standard_Household: 0.5,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0.4,
        },
        {
          Time: "22:30",
          Standard_Household: 0.5,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0.4,
        },
        {
          Time: "23:00",
          Standard_Household: 0.2,
          HeatPump_Household: 0.4,
          HeatPump_Battery_Household: 0.4,
        },
        {
          Time: "23:30",
          Standard_Household: 0.2,
          HeatPump_Household: 0.5,
          HeatPump_Battery_Household: 0.5,
        },
      ]);
    });
  });
});
