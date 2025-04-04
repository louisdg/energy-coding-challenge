export type FlexibilityEvent = "demand_turn_down" | "demand_turn_up";

export type FlexibilityOpportunityData = {
  event_type: string;
  start_time: string;
  end_time: string;
  price_per_kWh: number;
  min_flexibility_kWh: number;
  max_flexibility_kWh: number;
};

export type FlexibilityOpportunity = {
  startTime: string;
  endTime: string;
  pricePerKwh: number;
};

export const flexibilityOpportunityMapper = (
  flexibilityOpportunity: FlexibilityOpportunityData,
): FlexibilityOpportunity => ({
  startTime: flexibilityOpportunity.start_time,
  endTime: flexibilityOpportunity.end_time,
  pricePerKwh: flexibilityOpportunity.price_per_kWh,
});
