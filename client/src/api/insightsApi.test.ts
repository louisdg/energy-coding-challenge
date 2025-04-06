import { AxiosInstance } from "axios";
import { buildInsightsApi, INSIGHTS_URL_PREFIX } from "./insightsApi";
import { HouseholdType } from "./householdEnergyUsageApi.ts";

describe("buildInsightsApi", () => {
  let mockedAxiosInstance: { get: jest.Mock };
  let insightsApi: ReturnType<typeof buildInsightsApi>;

  beforeEach(() => {
    mockedAxiosInstance = {
      get: jest.fn(),
    };
    insightsApi = buildInsightsApi(
      mockedAxiosInstance as unknown as AxiosInstance,
    );
  });

  describe("getTotalEnergyCostInPenceForHouseholdTypeAtDate", () => {
    it("should fetch total energy cost for a given household type and date", async () => {
      const householdType: HouseholdType = "STANDARD";
      const date = "2023-11-15";
      const mockedData = 123.45;

      mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockedData });

      const result =
        await insightsApi.getTotalEnergyCostInPenceForHouseholdTypeAtDate(
          householdType,
          date,
        );

      expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
        `${INSIGHTS_URL_PREFIX}/total-energy-cost?householdType=${householdType}&date=${date}`,
      );
      expect(result).toBe(mockedData);
    });
  });

  describe("getPotentialEarningsInPenceForHouseholdType", () => {
    it("should fetch potential earnings for a given household type", async () => {
      const householdType: HouseholdType = "STANDARD";
      const mockedData = 678.9;

      mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockedData });

      const result =
        await insightsApi.getPotentialEarningsInPenceForHouseholdType(
          householdType,
        );

      expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
        `${INSIGHTS_URL_PREFIX}/potential-earnings?householdType=${householdType}`,
      );
      expect(result).toBe(mockedData);
    });
  });
});
