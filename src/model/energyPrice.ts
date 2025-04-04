export type AgileEnergyPrice = {
  value_exc_vat: number;
  value_inc_vat: number;
  valid_from: string;
  valid_to: string;
  payment_method: null;
};

export type EnergyPrice = {
  valueExcVatInPence: number;
  valueIncVatInPence: number;
  validFrom: string;
  validTo: string;
};

export const energyPriceMapper = (
  agileEnergyPrice: AgileEnergyPrice,
): EnergyPrice => ({
  valueExcVatInPence: agileEnergyPrice.value_exc_vat,
  valueIncVatInPence: agileEnergyPrice.value_inc_vat,
  validFrom: agileEnergyPrice.valid_from,
  validTo: agileEnergyPrice.valid_to,
});
