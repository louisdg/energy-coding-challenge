import express from "express";
import energyPricesController from "./energyPrices/energyPricesController";

const app = express();

app.use("/energy-prices", energyPricesController);

export default app;
