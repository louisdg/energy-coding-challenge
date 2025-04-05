import request from "supertest";
import app from "../app";

describe("householdEnergyUsageController", () => {
  describe("/total", () => {
    it("should return a bad request if no householdType is provided", async () => {
      const res = await request(app)
        .get("/household-energy-usage/total")
        .send();
      expect(res.statusCode).toBe(400);
    });

    it("should return a bad request if householdType is not in the accepted household types", async () => {
      const res = await request(app)
        .get("/household-energy-usage/total?householdType=not-a-household-type")
        .send();
      expect(res.statusCode).toBe(400);
    });

    it.each([
      { householdType: "STANDARD", expectedTotal: 17.6 },
      { householdType: "HEAT_PUMP", expectedTotal: 35.3 },
      { householdType: "HEAT_PUMP_BATTERY", expectedTotal: 35.1 },
    ] as const)(
      "should return the total energy usage for a $householdType household",
      async ({ householdType, expectedTotal }) => {
        const res = await request(app)
          .get(`/household-energy-usage/total?householdType=${householdType}`)
          .send();
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.text)).toEqual(expectedTotal);
      },
    );
  });

  describe("/peak", () => {
    it("should identify the peak energy usage across households", async () => {
      const res = await request(app).get("/household-energy-usage/peak").send();
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.text)).toEqual({ time: "02:30", usageInKwh: 5.6 });
    });
  });
});
