import { energyPriceMapper } from "./energyPrice";

describe("energyPrice", () => {
  describe("energyPriceMapper", () => {
    it("should map an AgileEnergyPrice object to an EnergyPrice object correctly", () => {
      const energyPrice = energyPriceMapper({
        value_exc_vat: 150,
        value_inc_vat: 180,
        valid_from: "2023-10-20T10:00:00Z",
        valid_to: "2023-10-20T11:00:00Z",
        payment_method: null,
      });
      expect(energyPrice).toEqual({
        valueExcVatInPence: 150,
        valueIncVatInPence: 180,
        validFrom: "2023-10-20T10:00:00Z",
        validTo: "2023-10-20T11:00:00Z",
      });
    });
  });
});
