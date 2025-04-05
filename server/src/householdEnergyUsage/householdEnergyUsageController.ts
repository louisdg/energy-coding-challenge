import express from "express";
import {
  getPeakEnergyUsageAcrossHouseholds,
  getTotalEnergyUsageForHouseholdType,
} from "./householdEnergyUsageService";
import { query } from "express-validator";
import validationErrorHandler from "../utils/validationErrorHandler";
import { HouseholdType, HouseholdTypes } from "../model/householdEnergyUsage";
import RequestWithQuery from "../utils/RequestWithQuery";

const router = express.Router();

router.get(
  "/total",
  query("householdType").notEmpty().isIn(HouseholdTypes),
  validationErrorHandler,
  async (
    req: RequestWithQuery<{
      householdType: HouseholdType;
    }>,
    res,
  ) => {
    const { householdType } = req.query;

    const totalEnergyUsageForHouseholdType =
      await getTotalEnergyUsageForHouseholdType(householdType);
    res.json(totalEnergyUsageForHouseholdType);
  },
);

router.get("/peak", async (_, res) => {
  const peakEnergyUsageAcrossHouseholds =
    await getPeakEnergyUsageAcrossHouseholds();
  res.json(peakEnergyUsageAcrossHouseholds);
});

export default router;
