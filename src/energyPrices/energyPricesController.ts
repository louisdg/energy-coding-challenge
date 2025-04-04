import express from "express";
import {
  getHighestPriceInPence,
  getLowestPriceInPence,
  getEnergyPrices,
} from "./energyPricesService";
import { query } from "express-validator";
import validationErrorHandler from "../utils/validationErrorHandler";
import RequestWithQuery from "../utils/RequestWithQuery";

const router = express.Router();

router.get(
  "/",
  query("from").notEmpty().isISO8601(),
  query("to").notEmpty().isISO8601(),
  validationErrorHandler,
  (
    req: RequestWithQuery<{
      from: string;
      to: string;
    }>,
    res,
  ) => {
    const { from, to } = req.query;

    const prices = getEnergyPrices(from, to);
    res.json(prices);
  },
);

router.get(
  "/lowest",
  query("date").notEmpty().isDate(),
  validationErrorHandler,
  (
    req: RequestWithQuery<{
      date: string;
    }>,
    res,
  ) => {
    const { date } = req.query;

    const lowestPriceInPence = getLowestPriceInPence(date);
    res.json(lowestPriceInPence);
  },
);

router.get(
  "/highest",
  query("date").notEmpty().isDate(),
  validationErrorHandler,
  (
    req: RequestWithQuery<{
      date: string;
    }>,
    res,
  ) => {
    const { date } = req.query;

    const highestPriceInPence = getHighestPriceInPence(date);
    res.json(highestPriceInPence);
  },
);

export default router;
