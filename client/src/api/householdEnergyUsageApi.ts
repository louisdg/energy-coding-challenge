import { AxiosInstance } from "axios";

export const HOUSEHOLD_ENERGY_USAGE_URL_PREFIX = "/household-energy-usage";

export const HouseholdTypes = [
  "STANDARD",
  "HEAT_PUMP",
  "HEAT_PUMP_BATTERY",
] as const;
export type HouseholdType = (typeof HouseholdTypes)[number];

export type EnergyUsage = {
  time: string;
  usageInKwh: number;
};

export const buildHouseholdEnergyUsageApi = (axiosInstance: AxiosInstance) => ({
  async getTotalEnergyUsageForHouseholdType(householdType: HouseholdType) {
    const response = await axiosInstance.get<number>(
      `${HOUSEHOLD_ENERGY_USAGE_URL_PREFIX}/total?householdType=${householdType}`,
    );
    return response.data;
  },

  async getPeakEnergyUsageAcrossHouseholds() {
    const response = await axiosInstance.get<EnergyUsage>(
      `${HOUSEHOLD_ENERGY_USAGE_URL_PREFIX}/peak`,
    );
    return response.data;
  },
});
