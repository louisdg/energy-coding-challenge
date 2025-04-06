import { AxiosInstance } from "axios";
import {
  buildFlexibilityOpportunitiesApi,
  FLEXIBILITY_OPPORTUNITIES_URL_PREFIX,
} from "./flexibilityOpportunitiesApi";

describe("flexibilityOpportunitiesApi", () => {
  describe("buildFlexibilityOpportunitiesApi", () => {
    let mockedAxiosInstance: { get: jest.Mock };
    let flexibilityOpportunitiesApi: ReturnType<
      typeof buildFlexibilityOpportunitiesApi
    >;

    beforeEach(() => {
      mockedAxiosInstance = {
        get: jest.fn(),
      };
      flexibilityOpportunitiesApi = buildFlexibilityOpportunitiesApi(
        mockedAxiosInstance as unknown as AxiosInstance,
      );
    });

    it("should fetch flexibility opportunities successfully", async () => {
      const mockedData = [
        {
          startTime: "00:00",
          endTime: "01:30",
          pricePerKwh: 123.45,
        },
        {
          startTime: "13:30",
          endTime: "16:00",
          pricePerKwh: 678.9,
        },
      ];
      mockedAxiosInstance.get.mockResolvedValueOnce({ data: mockedData });

      const flexibilityOpportunities =
        await flexibilityOpportunitiesApi.getFlexibilityOpportunities();

      expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
        `${FLEXIBILITY_OPPORTUNITIES_URL_PREFIX}`,
      );
      expect(flexibilityOpportunities).toEqual(mockedData);
    });
  });
});
