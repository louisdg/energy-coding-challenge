import {
  getPotentialEarningsInPenceForHouseholdType,
  getTotalEnergyCostInPenceForHouseholdTypeAtDate,
} from "./insightsService";

describe("insightsService", () => {
  describe("getTotalEnergyCostForHouseholdTypeAtDate", () => {
    it.each([
      { householdType: "STANDARD", expectedTotalEnergyCostInPence: 507.78 },
      { householdType: "HEAT_PUMP", expectedTotalEnergyCostInPence: 1015.13 },
      {
        householdType: "HEAT_PUMP_BATTERY",
        expectedTotalEnergyCostInPence: 734.82,
      },
    ] as const)(
      "should calculate a $householdType household's total energy cost for the day using price and usage data",
      async ({ householdType, expectedTotalEnergyCostInPence }) => {
        const totalEnergyCostInPence =
          await getTotalEnergyCostInPenceForHouseholdTypeAtDate(
            householdType,
            "2025-03-12",
          );
        expect(totalEnergyCostInPence).toEqual(expectedTotalEnergyCostInPence);
      },
    );
  });

  describe("getPotentialEarningsForHouseholdType", () => {
    it.each([
      {
        householdType: "STANDARD",
        expectedPotentialEarningsInPence: 7.65,
      },
      {
        householdType: "HEAT_PUMP",
        expectedPotentialEarningsInPence: 9.0,
      },
      {
        householdType: "HEAT_PUMP_BATTERY",
        expectedPotentialEarningsInPence: 1.5,
      },
    ] as const)(
      "should estimate potential earnings for a household if it participated in the flexibility market",
      async ({ householdType, expectedPotentialEarningsInPence }) => {
        const potentialEarnings =
          await getPotentialEarningsInPenceForHouseholdType(householdType);
        expect(potentialEarnings).toEqual(expectedPotentialEarningsInPence);
      },
    );
  });
});
