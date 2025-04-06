import { AxiosInstance } from "axios";

export const HOUSEHOLD_ENERGY_USAGE_URL_PREFIX = "/household-energy-usage";

export type HouseholdType = "STANDARD" | "HEAT_PUMP" | "HEAT_PUMP_BATTERY";

export const buildHouseholdEnergyUsageApi = (axiosInstance: AxiosInstance) => ({
  async getTotalEnergyUsageForHouseholdType(householdType: HouseholdType) {
    const response = await axiosInstance.get<number>(
      `${HOUSEHOLD_ENERGY_USAGE_URL_PREFIX}/total?householdType=${householdType}`,
    );
    return response.data;
  },

  async getPeakEnergyUsageAcrossHouseholds() {
    const response = await axiosInstance.get<number>(
      `${HOUSEHOLD_ENERGY_USAGE_URL_PREFIX}/peak`,
    );
    return response.data;
  },
});
