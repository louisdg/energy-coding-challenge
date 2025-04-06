import { AxiosInstance } from "axios";

export const FLEXIBILITY_OPPORTUNITIES_URL_PREFIX =
  "/flexibility-opportunities";

export type FlexibilityOpportunity = {
  startTime: number;
  endTime: number;
  pricePerKwh: string;
};

export const buildFlexibilityOpportunitiesApi = (
  axiosInstance: AxiosInstance,
) => ({
  async getFlexibilityOpportunities() {
    const response = await axiosInstance.get<FlexibilityOpportunity[]>(
      `${FLEXIBILITY_OPPORTUNITIES_URL_PREFIX}`,
    );
    return response.data;
  },
});
