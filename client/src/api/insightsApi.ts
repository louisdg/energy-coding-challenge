import { AxiosInstance } from "axios";
import { HouseholdType } from "./householdEnergyUsageApi.ts";

export const INSIGHTS_URL_PREFIX = "/insights";

export const buildInsightsApi = (axiosInstance: AxiosInstance) => ({
  async getTotalEnergyCostInPenceForHouseholdTypeAtDate(
    householdType: HouseholdType,
    date: string,
  ) {
    const response = await axiosInstance.get<number>(
      `${INSIGHTS_URL_PREFIX}/total-energy-cost?householdType=${householdType}&date=${date}`,
    );
    return response.data;
  },

  async getPotentialEarningsInPenceForHouseholdType(
    householdType: HouseholdType,
  ) {
    const response = await axiosInstance.get<number>(
      `${INSIGHTS_URL_PREFIX}/potential-earnings?householdType=${householdType}`,
    );
    return response.data;
  },
});
