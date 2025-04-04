import express from "express";
import { query } from "express-validator";
import { HouseholdType, HouseholdTypes } from "../model/householdEnergyUsage";
import validationErrorHandler from "../utils/validationErrorHandler";
import {
  getPotentialEarningsInPenceForHouseholdType,
  getTotalEnergyCostInPenceForHouseholdTypeAtDate,
} from "./insightsService";
import RequestWithQuery from "../utils/RequestWithQuery";

const router = express.Router();

router.get(
  "/total-energy-cost",
  query("householdType").notEmpty().isIn(HouseholdTypes),
  query("date").notEmpty().isDate(),
  validationErrorHandler,
  async (
    req: RequestWithQuery<{
      householdType: HouseholdType;
      date: string;
    }>,
    res,
  ) => {
    const { householdType, date } = req.query;

    const totalEnergyCostInPence =
      await getTotalEnergyCostInPenceForHouseholdTypeAtDate(
        householdType,
        date,
      );
    res.json(totalEnergyCostInPence);
  },
);

router.get(
  "/potential-earnings",
  query("householdType").notEmpty().isIn(HouseholdTypes),
  validationErrorHandler,
  async (
    req: RequestWithQuery<{
      householdType: HouseholdType;
    }>,
    res,
  ) => {
    const { householdType } = req.query;

    const potentialEarningsInPence =
      await getPotentialEarningsInPenceForHouseholdType(householdType);
    res.json(potentialEarningsInPence);
  },
);

export default router;
