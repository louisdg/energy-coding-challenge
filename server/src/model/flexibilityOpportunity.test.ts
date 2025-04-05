import {
  flexibilityEventMapper,
  flexibilityOpportunityMapper,
} from "./flexibilityOpportunity";

describe("flexibilityOpportunity", () => {
  describe("flexibilityEventMapper", () => {
    it.each([
      {
        eventType: "demand_turn_down",
        expectedFlexibilityEvent: "DEMAND_TURN_DOWN",
      },
      {
        eventType: "demand_turn_up",
        expectedFlexibilityEvent: "DEMAND_TURN_UP",
      },
    ] as const)(
      "should correctly map $eventType to $expectedFlexibilityEvent",
      ({ eventType, expectedFlexibilityEvent }) => {
        expect(flexibilityEventMapper(eventType)).toBe(
          expectedFlexibilityEvent,
        );
      },
    );

    it("should throw an error for an unknown event type", () => {
      expect(() => flexibilityEventMapper("not-an-event-type")).toThrow(
        "Unknown event type",
      );
    });
  });

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
        eventType: "DEMAND_TURN_DOWN",
        startTime: "2023-11-15T18:00:00Z",
        endTime: "2023-11-15T23:00:00Z",
        pricePerKwh: 0.123,
        minFlexibilityKwh: 456,
        maxFlexibilityKwh: 789,
      });
    });
  });
});
