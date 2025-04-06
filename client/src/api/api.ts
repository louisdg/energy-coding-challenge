import axios from "axios";
import { buildEnergyPricesApi } from "./energyPricesApi.ts";
import { buildHouseholdEnergyUsageApi } from "./householdEnergyUsageApi.ts";
import { buildFlexibilityOpportunitiesApi } from "./flexibilityOpportunitiesApi.ts";
import { buildInsightsApi } from "./insightsApi.ts";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export default {
  energyPrices: buildEnergyPricesApi(axiosInstance),
  householdEnergyUsage: buildHouseholdEnergyUsageApi(axiosInstance),
  flexibilityOpportunities: buildFlexibilityOpportunitiesApi(axiosInstance),
  insights: buildInsightsApi(axiosInstance),
};
