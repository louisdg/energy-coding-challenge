import flexibilityOpportunityData from "../data/flexibility_opportunity.json";
import {
  FlexibilityOpportunity,
  flexibilityOpportunityMapper,
} from "../model/flexibilityOpportunity";

export function getFlexibilityOpportunities(): FlexibilityOpportunity[] {
  return flexibilityOpportunityData.flexibility_opportunities.map(
    flexibilityOpportunityMapper,
  );
}
