import { getFlexibilityOpportunities } from "./flexibilityOpportunitiesService";

describe("flexibilityOpportunitiesService", () => {
  describe("getExportingOpportunities", () => {
    it("should return the times and prices where energy shifting/exporting is available", () => {
      const flexibilityOpportunities = getFlexibilityOpportunities();
      expect(flexibilityOpportunities).toEqual([
        {
          startTime: "18:00",
          endTime: "19:30",
          pricePerKwh: 1.5,
        },
        {
          startTime: "02:00",
          endTime: "04:00",
          pricePerKwh: 0.5,
        },
      ]);
    });
  });
});
