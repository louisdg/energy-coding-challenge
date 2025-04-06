import { AxiosInstance } from "axios";

export const ENERGY_PRICES_URL_PREFIX = "/energy-prices";

export type EnergyPrice = {
  valueExcVatInPence: number;
  valueIncVatInPence: number;
  validFrom: string;
  validTo: string;
};

export const buildEnergyPricesApi = (axiosInstance: AxiosInstance) => ({
  async getEnergyPrices(from: string, to: string) {
    const response = await axiosInstance.get<EnergyPrice[]>(
      `${ENERGY_PRICES_URL_PREFIX}?from=${from}&to=${to}`,
    );
    return response.data;
  },

  async getLowestPriceInPence(date: string) {
    const response = await axiosInstance.get<number>(
      `${ENERGY_PRICES_URL_PREFIX}/lowest?date=${date}`,
    );
    return response.data;
  },

  async getHighestPriceInPence(date: string) {
    const response = await axiosInstance.get<number>(
      `${ENERGY_PRICES_URL_PREFIX}/highest?date=${date}`,
    );
    return response.data;
  },
});
