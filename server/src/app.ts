import express from "express";
import cors from "cors";
import corsOptions from "./corsOptions";
import energyPricesController from "./energyPrices/energyPricesController";
import householdEnergyUsageController from "./householdEnergyUsage/householdEnergyUsageController";
import flexibilityOpportunitiesController from "./flexibilityOpportunities/flexibilityOpportunitiesController";
import insightsController from "./insights/insightsController";

const app = express();

app.use(cors(corsOptions));

app.use("/energy-prices", energyPricesController);
app.use("/household-energy-usage", householdEnergyUsageController);
app.use("/flexibility-opportunities", flexibilityOpportunitiesController);
app.use("/insights", insightsController);

export default app;
