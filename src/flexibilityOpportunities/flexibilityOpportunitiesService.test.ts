import { getFlexibilityOpportunities } from "./flexibilityOpportunitiesService";

describe("flexibilityOpportunitiesService", () => {
  describe("getExportingOpportunities", () => {
    it("should return the times and prices where energy shifting/exporting is available", () => {
      const flexibilityOpportunities = getFlexibilityOpportunities();
      expect(flexibilityOpportunities).toEqual([
        {
          eventType: "DEMAND_TURN_DOWN",
          startTime: "18:00",
          endTime: "19:30",
          pricePerKwh: 1.5,
          minFlexibilityKwh: 1.0,
          maxFlexibilityKwh: 5.0,
        },
        {
          eventType: "DEMAND_TURN_UP",
          startTime: "02:00",
          endTime: "04:00",
          pricePerKwh: 0.5,
          minFlexibilityKwh: 0.5,
          maxFlexibilityKwh: 3,
        },
      ]);
    });
  });
});
