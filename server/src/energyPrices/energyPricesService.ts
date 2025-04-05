import energyPricesData from "../data/agile_price_example.json";
import { EnergyPrice, energyPriceMapper } from "../model/energyPrice";

export function getEnergyPrices(from: string, to: string): EnergyPrice[] {
  return energyPricesData.results
    .map(energyPriceMapper)
    .filter((data) => data.validFrom >= from && data.validTo <= to);
}

export function getLowestPriceInPence(date: string): EnergyPrice | null {
  const filteredPrices = getEnergyPricesDataForDate(date);
  if (filteredPrices.length === 0) {
    return null;
  }

  return filteredPrices.reduce((lowestPrice, currentPrice) =>
    currentPrice.valueIncVatInPence < lowestPrice.valueIncVatInPence
      ? currentPrice
      : lowestPrice,
  );
}

export function getHighestPriceInPence(date: string): EnergyPrice | null {
  const filteredPrices = getEnergyPricesDataForDate(date);
  if (filteredPrices.length === 0) {
    return null;
  }

  return filteredPrices.reduce((highestPrice, currentPrice) =>
    currentPrice.valueIncVatInPence > highestPrice.valueIncVatInPence
      ? currentPrice
      : highestPrice,
  );
}

export function getEnergyPricesDataForDate(date: string): EnergyPrice[] {
  return energyPricesData.results.map(energyPriceMapper).filter((data) => {
    return data.validFrom.startsWith(date);
  });
}
