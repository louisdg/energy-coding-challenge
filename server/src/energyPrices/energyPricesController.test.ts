import request from "supertest";
import app from "../app";

describe("energyPricesController", () => {
  describe("/", () => {
    it("should return a bad request if no from is provided", async () => {
      const res = await request(app)
        .get("/energy-prices?to=2025-03-13T21:00:00Z")
        .send();
      expect(res.statusCode).toBe(400);
    });

    it("should return a bad request if from is not an ISO8601 date", async () => {
      const res = await request(app)
        .get("/energy-prices?from=not-a-date&to=2025-03-13T21:00:00Z")
        .send();
      expect(res.statusCode).toBe(400);
    });

    it("should return a bad request if no to is provided", async () => {
      const res = await request(app)
        .get("/energy-prices?from=2025-03-13T18:00:00Z")
        .send();
      expect(res.statusCode).toBe(400);
    });

    it("should return a bad request if to is not an ISO8601 date", async () => {
      const res = await request(app)
        .get("/energy-prices?from=2025-03-13T18:00:00Z&to=not-a-date")
        .send();
      expect(res.statusCode).toBe(400);
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
      "should return prices over a time range",
      async ({ fromIso8601, toIso8601 }) => {
        const res = await request(app)
          .get(`/energy-prices?from=${fromIso8601}&to=${toIso8601}`)
          .send();
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.text)).toEqual([
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

  describe("/lowest", () => {
    it("should return a bad request if no date is provided", async () => {
      const res = await request(app).get("/energy-prices/lowest").send();
      expect(res.statusCode).toBe(400);
    });

    it("should identify the lowest price in a given day", async () => {
      const res = await request(app)
        .get("/energy-prices/lowest?date=2025-03-13")
        .send();
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.text)).toEqual({
        validFrom: "2025-03-13T03:30:00Z",
        validTo: "2025-03-13T04:00:00Z",
        valueExcVatInPence: 18.58,
        valueIncVatInPence: 19.509,
      });
    });
  });

  describe("/highest", () => {
    it("should return a bad request if no date is provided", async () => {
      const res = await request(app).get("/energy-prices/highest").send();
      expect(res.statusCode).toBe(400);
    });

    it("should identify the highest price in a given day", async () => {
      const res = await request(app)
        .get("/energy-prices/highest?date=2025-03-13")
        .send();
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.text)).toEqual({
        valueExcVatInPence: 46.06,
        valueIncVatInPence: 48.363,
        validFrom: "2025-03-13T18:30:00Z",
        validTo: "2025-03-13T19:00:00Z",
      });
    });
  });
});
