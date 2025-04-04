import request from "supertest";
import app from "../app";

describe("insightsController", () => {
  describe("/total-energy-cost", () => {
    it("should return a bad request if no householdType is provided", async () => {
      const res = await request(app)
        .get("/insights/total-energy-cost?date=2025-03-13T21:00:00Z")
        .send();
      expect(res.statusCode).toBe(400);
    });

    it("should return a bad request if householdType is not in the accepted household types", async () => {
      const res = await request(app)
        .get(
          "/insights/total-energy-cost?householdType=not-a-household-type&date=2025-03-13",
        )
        .send();
      expect(res.statusCode).toBe(400);
    });

    it("should return a bad request if no date is provided", async () => {
      const res = await request(app)
        .get("/insights/total-energy-cost?householdType=STANDARD")
        .send();
      expect(res.statusCode).toBe(400);
    });

    it("should return a bad request if householdType is not in the accepted household types", async () => {
      const res = await request(app)
        .get(
          "/insights/total-energy-cost?householdType=STANDARD&date=not-a-date",
        )
        .send();
      expect(res.statusCode).toBe(400);
    });

    it("should calculate a household's total energy cost for the day using price and usage data", async () => {
      const res = await request(app)
        .get(
          "/insights/total-energy-cost?householdType=STANDARD&date=2025-03-13",
        )
        .send();
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.text)).toEqual(533.73);
    });
  });

  describe("/potential-earnings", () => {
    it("should return a bad request if no householdType is provided", async () => {
      const res = await request(app).get("/insights/potential-earnings").send();
      expect(res.statusCode).toBe(400);
    });

    it("should return a bad request if householdType is not in the accepted household types", async () => {
      const res = await request(app)
        .get("/insights/potential-earnings?householdType=not-a-household-type")
        .send();
      expect(res.statusCode).toBe(400);
    });

    it.each([
      {
        householdType: "STANDARD",
        expectedPotentialEarningsInPence: 765,
      },
      {
        householdType: "HEAT_PUMP",
        expectedPotentialEarningsInPence: 900,
      },
      {
        householdType: "HEAT_PUMP_BATTERY",
        expectedPotentialEarningsInPence: 150,
      },
    ] as const)(
      "should estimate potential earnings for a household if it participated in the flexibility market",
      async ({ householdType, expectedPotentialEarningsInPence }) => {
        const res = await request(app)
          .get(`/insights/potential-earnings?householdType=${householdType}`)
          .send();
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.text)).toEqual(expectedPotentialEarningsInPence);
      },
    );
  });
});
