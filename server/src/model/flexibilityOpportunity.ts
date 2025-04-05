export type FlexibilityEvent = "DEMAND_TURN_DOWN" | "DEMAND_TURN_UP";

export type FlexibilityOpportunityData = {
  event_type: string;
  start_time: string;
  end_time: string;
  price_per_kWh: number;
  min_flexibility_kWh: number;
  max_flexibility_kWh: number;
};

export type FlexibilityOpportunity = {
  eventType: FlexibilityEvent;
  startTime: string;
  endTime: string;
  pricePerKwh: number;
  minFlexibilityKwh: number;
  maxFlexibilityKwh: number;
};

export const flexibilityEventMapper = (eventType: string): FlexibilityEvent => {
  switch (eventType) {
    case "demand_turn_down":
      return "DEMAND_TURN_DOWN";
    case "demand_turn_up":
      return "DEMAND_TURN_UP";
    default:
      throw new Error("Unknown event type");
  }
};

export const flexibilityOpportunityMapper = (
  flexibilityOpportunity: FlexibilityOpportunityData,
): FlexibilityOpportunity => ({
  eventType: flexibilityEventMapper(flexibilityOpportunity.event_type),
  startTime: flexibilityOpportunity.start_time,
  endTime: flexibilityOpportunity.end_time,
  pricePerKwh: flexibilityOpportunity.price_per_kWh,
  minFlexibilityKwh: flexibilityOpportunity.min_flexibility_kWh,
  maxFlexibilityKwh: flexibilityOpportunity.max_flexibility_kWh,
});
