import {
  getHighestPriceInPence,
  getLowestPriceInPence,
  getEnergyPrices,
  getEnergyPricesDataForDate,
} from "./energyPricesService";

describe("energyPricesService", () => {
  describe("getEnergyPrices", () => {
    it("should return an empty array if there is no data for the given time range", () => {
      const prices = getEnergyPrices(
        "1997-04-06T18:00:00Z",
        "1997-04-06T21:00:00Z",
      );
      expect(prices).toEqual([]);
    });

    it.each([
      {
        fromIso8601: "2025-03-13T18:00:00Z",
        toIso8601: "2025-03-13T21:00:00Z",
      },
      {
        fromIso8601: "2025-03-13T18:00:00.000Z",
        toIso8601: "2025-03-13T21:00:00.000Z",
      },
    ])(
      "should return prices in the given time range",
      ({ fromIso8601, toIso8601 }) => {
        const prices = getEnergyPrices(fromIso8601, toIso8601);
        expect(prices).toEqual([
          {
            valueExcVatInPence: 26.5,
            valueIncVatInPence: 27.825,
            validFrom: "2025-03-13T20:30:00Z",
            validTo: "2025-03-13T21:00:00Z",
          },
          {
            valueExcVatInPence: 29.9,
            valueIncVatInPence: 31.395,
            validFrom: "2025-03-13T20:00:00Z",
            validTo: "2025-03-13T20:30:00Z",
          },
          {
            valueExcVatInPence: 29.9,
            valueIncVatInPence: 31.395,
            validFrom: "2025-03-13T19:30:00Z",
            validTo: "2025-03-13T20:00:00Z",
          },
          {
            valueExcVatInPence: 30.54,
            valueIncVatInPence: 32.067,
            validFrom: "2025-03-13T19:00:00Z",
            validTo: "2025-03-13T19:30:00Z",
          },
          {
            valueExcVatInPence: 46.06,
            valueIncVatInPence: 48.363,
            validFrom: "2025-03-13T18:30:00Z",
            validTo: "2025-03-13T19:00:00Z",
          },
          {
            valueExcVatInPence: 44.35,
            valueIncVatInPence: 46.5675,
            validFrom: "2025-03-13T18:00:00Z",
            validTo: "2025-03-13T18:30:00Z",
          },
        ]);
      },
    );
  });

  describe("getLowestPriceInPence", () => {
    it("should return null if there is not data for that date", () => {
      const lowestPrice = getLowestPriceInPence("1997-04-06");
      expect(lowestPrice).toBeNull();
    });

    it("should return the lowest price for a given day", () => {
      const lowestPrice = getLowestPriceInPence("2025-03-13");
      expect(lowestPrice).toEqual({
        valueExcVatInPence: 18.58,
        valueIncVatInPence: 19.509,
        validFrom: "2025-03-13T03:30:00Z",
        validTo: "2025-03-13T04:00:00Z",
      });
    });
  });

  describe("getHighestPriceInPence", () => {
    it("should return null if there is not data for that date", () => {
      const highestPrice = getHighestPriceInPence("1997-04-06");
      expect(highestPrice).toBeNull();
    });

    it("should return the highest price for a given day", () => {
      const highestPrice = getHighestPriceInPence("2025-03-13");
      expect(highestPrice).toEqual({
        valueExcVatInPence: 46.06,
        valueIncVatInPence: 48.363,
        validFrom: "2025-03-13T18:30:00Z",
        validTo: "2025-03-13T19:00:00Z",
      });
    });
  });

  describe("getEnergyPricesDataForDate", () => {
    it("should return the energy prices data for a given date", () => {
      const prices = getEnergyPricesDataForDate("2025-03-12");
      expect(prices).toEqual([
        {
          valueExcVatInPence: 20.72,
          valueIncVatInPence: 21.756,
          validFrom: "2025-03-12T23:30:00Z",
          validTo: "2025-03-13T00:00:00Z",
        },
        {
          valueExcVatInPence: 22.54,
          valueIncVatInPence: 23.667,
          validFrom: "2025-03-12T23:00:00Z",
          validTo: "2025-03-12T23:30:00Z",
        },
        {
          valueExcVatInPence: 20.03,
          valueIncVatInPence: 21.0315,
          validFrom: "2025-03-12T22:30:00Z",
          validTo: "2025-03-12T23:00:00Z",
        },
        {
          valueExcVatInPence: 21.8,
          valueIncVatInPence: 22.89,
          validFrom: "2025-03-12T22:00:00Z",
          validTo: "2025-03-12T22:30:00Z",
        },
        {
          valueExcVatInPence: 21.55,
          valueIncVatInPence: 22.6275,
          validFrom: "2025-03-12T21:30:00Z",
          validTo: "2025-03-12T22:00:00Z",
        },
        {
          valueExcVatInPence: 23.44,
          valueIncVatInPence: 24.612,
          validFrom: "2025-03-12T21:00:00Z",
          validTo: "2025-03-12T21:30:00Z",
        },
        {
          valueExcVatInPence: 24.15,
          valueIncVatInPence: 25.3575,
          validFrom: "2025-03-12T20:30:00Z",
          validTo: "2025-03-12T21:00:00Z",
        },
        {
          valueExcVatInPence: 26.22,
          valueIncVatInPence: 27.531,
          validFrom: "2025-03-12T20:00:00Z",
          validTo: "2025-03-12T20:30:00Z",
        },
        {
          valueExcVatInPence: 27.37,
          valueIncVatInPence: 28.7385,
          validFrom: "2025-03-12T19:30:00Z",
          validTo: "2025-03-12T20:00:00Z",
        },
        {
          valueExcVatInPence: 28.83,
          valueIncVatInPence: 30.2715,
          validFrom: "2025-03-12T19:00:00Z",
          validTo: "2025-03-12T19:30:00Z",
        },
        {
          valueExcVatInPence: 44.46,
          valueIncVatInPence: 46.683,
          validFrom: "2025-03-12T18:30:00Z",
          validTo: "2025-03-12T19:00:00Z",
        },
        {
          valueExcVatInPence: 44.46,
          valueIncVatInPence: 46.683,
          validFrom: "2025-03-12T18:00:00Z",
          validTo: "2025-03-12T18:30:00Z",
        },
        {
          valueExcVatInPence: 42.05,
          valueIncVatInPence: 44.1525,
          validFrom: "2025-03-12T17:30:00Z",
          validTo: "2025-03-12T18:00:00Z",
        },
        {
          valueExcVatInPence: 38.44,
          valueIncVatInPence: 40.362,
          validFrom: "2025-03-12T17:00:00Z",
          validTo: "2025-03-12T17:30:00Z",
        },
        {
          valueExcVatInPence: 33.49,
          valueIncVatInPence: 35.1645,
          validFrom: "2025-03-12T16:30:00Z",
          validTo: "2025-03-12T17:00:00Z",
        },
        {
          valueExcVatInPence: 30.8,
          valueIncVatInPence: 32.34,
          validFrom: "2025-03-12T16:00:00Z",
          validTo: "2025-03-12T16:30:00Z",
        },
        {
          valueExcVatInPence: 20.2,
          valueIncVatInPence: 21.21,
          validFrom: "2025-03-12T15:30:00Z",
          validTo: "2025-03-12T16:00:00Z",
        },
        {
          valueExcVatInPence: 20.2,
          valueIncVatInPence: 21.21,
          validFrom: "2025-03-12T15:00:00Z",
          validTo: "2025-03-12T15:30:00Z",
        },
        {
          valueExcVatInPence: 19.12,
          valueIncVatInPence: 20.076,
          validFrom: "2025-03-12T14:30:00Z",
          validTo: "2025-03-12T15:00:00Z",
        },
        {
          valueExcVatInPence: 20.12,
          valueIncVatInPence: 21.126,
          validFrom: "2025-03-12T14:00:00Z",
          validTo: "2025-03-12T14:30:00Z",
        },
        {
          valueExcVatInPence: 19.53,
          valueIncVatInPence: 20.5065,
          validFrom: "2025-03-12T13:30:00Z",
          validTo: "2025-03-12T14:00:00Z",
        },
        {
          valueExcVatInPence: 20.03,
          valueIncVatInPence: 21.0315,
          validFrom: "2025-03-12T13:00:00Z",
          validTo: "2025-03-12T13:30:00Z",
        },
        {
          valueExcVatInPence: 20.36,
          valueIncVatInPence: 21.378,
          validFrom: "2025-03-12T12:30:00Z",
          validTo: "2025-03-12T13:00:00Z",
        },
        {
          valueExcVatInPence: 20.24,
          valueIncVatInPence: 21.252,
          validFrom: "2025-03-12T12:00:00Z",
          validTo: "2025-03-12T12:30:00Z",
        },
        {
          valueExcVatInPence: 20.06,
          valueIncVatInPence: 21.063,
          validFrom: "2025-03-12T11:30:00Z",
          validTo: "2025-03-12T12:00:00Z",
        },
        {
          valueExcVatInPence: 19.52,
          valueIncVatInPence: 20.496,
          validFrom: "2025-03-12T11:00:00Z",
          validTo: "2025-03-12T11:30:00Z",
        },
        {
          valueExcVatInPence: 20.26,
          valueIncVatInPence: 21.273,
          validFrom: "2025-03-12T10:30:00Z",
          validTo: "2025-03-12T11:00:00Z",
        },
        {
          valueExcVatInPence: 21.21,
          valueIncVatInPence: 22.2705,
          validFrom: "2025-03-12T10:00:00Z",
          validTo: "2025-03-12T10:30:00Z",
        },
        {
          valueExcVatInPence: 20.01,
          valueIncVatInPence: 21.0105,
          validFrom: "2025-03-12T09:30:00Z",
          validTo: "2025-03-12T10:00:00Z",
        },
        {
          valueExcVatInPence: 22.36,
          valueIncVatInPence: 23.478,
          validFrom: "2025-03-12T09:00:00Z",
          validTo: "2025-03-12T09:30:00Z",
        },
        {
          valueExcVatInPence: 23.64,
          valueIncVatInPence: 24.822,
          validFrom: "2025-03-12T08:30:00Z",
          validTo: "2025-03-12T09:00:00Z",
        },
        {
          valueExcVatInPence: 24.77,
          valueIncVatInPence: 26.0085,
          validFrom: "2025-03-12T08:00:00Z",
          validTo: "2025-03-12T08:30:00Z",
        },
        {
          valueExcVatInPence: 25.99,
          valueIncVatInPence: 27.2895,
          validFrom: "2025-03-12T07:30:00Z",
          validTo: "2025-03-12T08:00:00Z",
        },
        {
          valueExcVatInPence: 24.39,
          valueIncVatInPence: 25.6095,
          validFrom: "2025-03-12T07:00:00Z",
          validTo: "2025-03-12T07:30:00Z",
        },
        {
          valueExcVatInPence: 24.7,
          valueIncVatInPence: 25.935,
          validFrom: "2025-03-12T06:30:00Z",
          validTo: "2025-03-12T07:00:00Z",
        },
        {
          valueExcVatInPence: 21.85,
          valueIncVatInPence: 22.9425,
          validFrom: "2025-03-12T06:00:00Z",
          validTo: "2025-03-12T06:30:00Z",
        },
        {
          valueExcVatInPence: 19.41,
          valueIncVatInPence: 20.3805,
          validFrom: "2025-03-12T05:30:00Z",
          validTo: "2025-03-12T06:00:00Z",
        },
        {
          valueExcVatInPence: 19.56,
          valueIncVatInPence: 20.538,
          validFrom: "2025-03-12T05:00:00Z",
          validTo: "2025-03-12T05:30:00Z",
        },
        {
          valueExcVatInPence: 17.71,
          valueIncVatInPence: 18.5955,
          validFrom: "2025-03-12T04:30:00Z",
          validTo: "2025-03-12T05:00:00Z",
        },
        {
          valueExcVatInPence: 19.5,
          valueIncVatInPence: 20.475,
          validFrom: "2025-03-12T04:00:00Z",
          validTo: "2025-03-12T04:30:00Z",
        },
        {
          valueExcVatInPence: 18.86,
          valueIncVatInPence: 19.803,
          validFrom: "2025-03-12T03:30:00Z",
          validTo: "2025-03-12T04:00:00Z",
        },
        {
          valueExcVatInPence: 20.25,
          valueIncVatInPence: 21.2625,
          validFrom: "2025-03-12T03:00:00Z",
          validTo: "2025-03-12T03:30:00Z",
        },
        {
          valueExcVatInPence: 19.78,
          valueIncVatInPence: 20.769,
          validFrom: "2025-03-12T02:30:00Z",
          validTo: "2025-03-12T03:00:00Z",
        },
        {
          valueExcVatInPence: 21.16,
          valueIncVatInPence: 22.218,
          validFrom: "2025-03-12T02:00:00Z",
          validTo: "2025-03-12T02:30:00Z",
        },
        {
          valueExcVatInPence: 19.76,
          valueIncVatInPence: 20.748,
          validFrom: "2025-03-12T01:30:00Z",
          validTo: "2025-03-12T02:00:00Z",
        },
        {
          valueExcVatInPence: 22.26,
          valueIncVatInPence: 23.373,
          validFrom: "2025-03-12T01:00:00Z",
          validTo: "2025-03-12T01:30:00Z",
        },
        {
          valueExcVatInPence: 20.7,
          valueIncVatInPence: 21.735,
          validFrom: "2025-03-12T00:30:00Z",
          validTo: "2025-03-12T01:00:00Z",
        },
        {
          valueExcVatInPence: 19.56,
          valueIncVatInPence: 20.538,
          validFrom: "2025-03-12T00:00:00Z",
          validTo: "2025-03-12T00:30:00Z",
        },
      ]);
    });
  });
});
