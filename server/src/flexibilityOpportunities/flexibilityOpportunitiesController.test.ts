import request from "supertest";
import app from "../app";

describe("flexibilityOpportunitiesController", () => {
  describe("/", () => {
    it("should return the times and prices where energy shifting/exporting is available", async () => {
      const res = await request(app).get("/flexibility-opportunities").send();
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.text)).toEqual([
        {
          startTime: "18:00",
          endTime: "19:30",
          pricePerKwh: 1.5,
        },
        {
          startTime: "02:00",
          endTime: "04:00",
          pricePerKwh: 0.5,
        },
      ]);
    });
  });
});
