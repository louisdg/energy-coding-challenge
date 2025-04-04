import { flexibilityOpportunityMapper } from "./flexibilityOpportunity";

describe("energyPrice", () => {
  describe("flexibilityOpportunityMapper", () => {
    it("should correctly map FlexibilityOpportunityData to FlexibilityOpportunity", () => {
      const flexibilityOpportunity = flexibilityOpportunityMapper({
        event_type: "demand_turn_down",
        start_time: "2023-11-15T18:00:00Z",
        end_time: "2023-11-15T23:00:00Z",
        price_per_kWh: 0.123,
        min_flexibility_kWh: 456,
        max_flexibility_kWh: 789,
      });
      expect(flexibilityOpportunity).toEqual({
        startTime: "2023-11-15T18:00:00Z",
        endTime: "2023-11-15T23:00:00Z",
        pricePerKwh: 0.123,
      });
    });
  });
});
