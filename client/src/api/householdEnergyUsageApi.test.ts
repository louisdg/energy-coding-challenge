import { AxiosInstance } from "axios";
import {
  buildHouseholdEnergyUsageApi,
  HOUSEHOLD_ENERGY_USAGE_URL_PREFIX,
  HouseholdType,
} from "./householdEnergyUsageApi";

describe("householdEnergyUsageApi", () => {
  describe("buildHouseholdEnergyUsageApi", () => {
    let mockedAxiosInstance: { get: jest.Mock };
    let householdEnergyUsageApi: ReturnType<
      typeof buildHouseholdEnergyUsageApi
    >;

    beforeEach(() => {
      mockedAxiosInstance = {
        get: jest.fn(),
      };
      householdEnergyUsageApi = buildHouseholdEnergyUsageApi(
        mockedAxiosInstance as unknown as AxiosInstance,
      );
    });

    describe("getTotalEnergyUsageForHouseholdType", () => {
      it("should fetch total energy usage for the given household type", async () => {
        const householdType: HouseholdType = "STANDARD";
        const mockedData = 999.99;
        mockedAxiosInstance.get.mockResolvedValueOnce({
          data: mockedData,
        });

        const totalEnergyUsage =
          await householdEnergyUsageApi.getTotalEnergyUsageForHouseholdType(
            householdType,
          );

        expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
          `${HOUSEHOLD_ENERGY_USAGE_URL_PREFIX}/total?householdType=${householdType}`,
        );
        expect(totalEnergyUsage).toBe(mockedData);
      });
    });

    describe("getPeakEnergyUsageAcrossHouseholds", () => {
      it("should fetch the peak energy usage across households", async () => {
        const mockedData = { usageInKwh: 123.45, time: "15:00" };
        mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockedData });

        const peakEnergyUsageAcrossHouseholds =
          await householdEnergyUsageApi.getPeakEnergyUsageAcrossHouseholds();

        expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
          `${HOUSEHOLD_ENERGY_USAGE_URL_PREFIX}/peak`,
        );
        expect(peakEnergyUsageAcrossHouseholds).toBe(mockedData);
      });
    });
  });
});
