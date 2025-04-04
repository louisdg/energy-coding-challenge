import express from "express";
import energyPricesController from "./energyPrices/energyPricesController";
import householdEnergyUsageController from "./householdEnergyUsage/householdEnergyUsageController";
import flexibilityOpportunitiesController from "./flexibilityOpportunities/flexibilityOpportunitiesController";

const app = express();

app.use("/energy-prices", energyPricesController);
app.use("/household-energy-usage", householdEnergyUsageController);
app.use("/flexibility-opportunities", flexibilityOpportunitiesController);

export default app;
