import express from "express";
import { getFlexibilityOpportunities } from "./flexibilityOpportunitiesService";

const router = express.Router();

router.get("/", (_, res) => {
  const flexibilityOpportunities = getFlexibilityOpportunities();
  res.json(flexibilityOpportunities);
});

export default router;
