import express from "express";
import { getFlexibilityOpportunities } from "./flexibilityOpportunitiesService";
import { FlexibilityOpportunity } from "../model/flexibilityOpportunity";

const router = express.Router();

router.get("/", (_, res) => {
  const flexibilityOpportunities = getFlexibilityOpportunities().map(
    flexibilityOpportunityResponseMapper,
  );
  res.json(flexibilityOpportunities);
});

const flexibilityOpportunityResponseMapper = (
  flexibilityOpportunity: FlexibilityOpportunity,
): FlexibilityOpportunityResponse => ({
  startTime: flexibilityOpportunity.startTime,
  endTime: flexibilityOpportunity.endTime,
  pricePerKwh: flexibilityOpportunity.pricePerKwh,
});

type FlexibilityOpportunityResponse = Omit<
  FlexibilityOpportunity,
  "eventType" | "minFlexibilityKwh" | "maxFlexibilityKwh"
>;

export default router;
