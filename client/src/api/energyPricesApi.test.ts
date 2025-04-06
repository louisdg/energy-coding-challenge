import { AxiosInstance } from "axios";
import {
  buildEnergyPricesApi,
  ENERGY_PRICES_URL_PREFIX,
} from "./energyPricesApi";

describe("energyPricesApi", () => {
  describe("buildEnergyPricesApi", () => {
    let mockedAxiosInstance: { get: jest.Mock };
    let energyPricesApi: ReturnType<typeof buildEnergyPricesApi>;

    beforeEach(() => {
      mockedAxiosInstance = {
        get: jest.fn(),
      };
      energyPricesApi = buildEnergyPricesApi(
        mockedAxiosInstance as unknown as AxiosInstance,
      );
    });

    describe("getEnergyPrices", () => {
      it("should fetch energy prices for a given date time range", async () => {
        const from = "2023-11-15T18:00:00Z";
        const to = "2023-11-15T19:00:00Z";
        const mockedData = [
          {
            valueExcVatInPence: 123.45,
            valueIncVatInPence: 678.9,
            validFrom: "2023-11-15T18:00:00Z",
            validTo: "2023-11-15T18:30:00Z",
          },
          {
            valueExcVatInPence: 1,
            valueIncVatInPence: 2,
            validFrom: "2023-11-15T18:00:00Z",
            validTo: "2023-11-15T19:00:00Z",
          },
        ];
        mockedAxiosInstance.get.mockResolvedValueOnce({
          data: mockedData,
        });

        const energyPrices = await energyPricesApi.getEnergyPrices(from, to);

        expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
          `${ENERGY_PRICES_URL_PREFIX}?from=${from}&to=${to}`,
        );
        expect(energyPrices).toEqual(mockedData);
      });
    });

    describe("getLowestPriceInPence", () => {
      it("should fetch the lowest price in pence for a given date", async () => {
        const date = "2023-11-15";
        const mockedData = 123.45;
        mockedAxiosInstance.get.mockResolvedValueOnce({
          data: mockedData,
        });

        const lowestPriceInPence =
          await energyPricesApi.getLowestPriceInPence(date);

        expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
          `${ENERGY_PRICES_URL_PREFIX}/lowest?date=${date}`,
        );
        expect(lowestPriceInPence).toBe(mockedData);
      });
    });

    describe("getHighestPriceInPence", () => {
      it("should fetch the highest price in pence for a given date", async () => {
        const date = "2023-11-15";
        const mockedData = 678.9;
        mockedAxiosInstance.get.mockResolvedValueOnce({
          data: mockedData,
        });

        const highestPriceInPence =
          await energyPricesApi.getHighestPriceInPence(date);

        expect(mockedAxiosInstance.get).toHaveBeenCalledWith(
          `${ENERGY_PRICES_URL_PREFIX}/highest?date=${date}`,
        );
        expect(highestPriceInPence).toBe(mockedData);
      });
    });
  });
});
