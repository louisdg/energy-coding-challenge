import {
  EnergyUsage,
  getEnergyUsageOfHousehold,
  HouseholdEnergyUsage,
  HouseholdType,
} from "../model/householdEnergyUsage";
import { getEnergyPricesDataForDate } from "../energyPrices/energyPricesService";
import { getHouseholdEnergyUsageData } from "../householdEnergyUsage/householdEnergyUsageService";
import roundToDecimal from "../utils/roundToDecimal";
import { getFlexibilityOpportunities } from "../flexibilityOpportunities/flexibilityOpportunitiesService";
import { EnergyPrice } from "../model/energyPrice";
import { FlexibilityOpportunity } from "../model/flexibilityOpportunity";
import unreachableSwitchBranch from "../utils/unreachableSwitchBranch";

export async function getTotalEnergyCostInPenceForHouseholdTypeAtDate(
  householdType: HouseholdType,
  date: string,
): Promise<number> {
  const householdEnergyUsageData = await getHouseholdEnergyUsageData();
  const energyPricesData = getEnergyPricesDataForDate(date);

  const totalEnergyCostInPence =
    calculateTotalEnergyCostInPenceForHouseholdType(
      householdType,
      householdEnergyUsageData,
      energyPricesData,
    );

  return roundToDecimal(totalEnergyCostInPence, 2);
}

function calculateTotalEnergyCostInPenceForHouseholdType(
  householdType: HouseholdType,
  householdEnergyUsageData: HouseholdEnergyUsage[],
  energyPricesData: EnergyPrice[],
): number {
  const energyPricesMap = new Map<string, number>();
  energyPricesData.forEach((energyPrice) => {
    const energyPriceTime = energyPrice.validFrom.split("T")[1].slice(0, 5);
    energyPricesMap.set(energyPriceTime, energyPrice.valueIncVatInPence);
  });

  return getEnergyUsageDataForHouseholdType(
    householdEnergyUsageData,
    householdType,
  ).reduce((total, energyUsage) => {
    const valueIncVatInPence = energyPricesMap.get(energyUsage.time);
    if (!valueIncVatInPence) {
      return total;
    }

    return total + energyUsage.usageInKwh * valueIncVatInPence;
  }, 0);
}

function getEnergyUsageDataForHouseholdType(
  householdEnergyUsageData: HouseholdEnergyUsage[],
  householdType: HouseholdType,
) {
  return householdEnergyUsageData.map((householdEnergyUsage): EnergyUsage => {
    return {
      time: householdEnergyUsage.Time,
      usageInKwh: getEnergyUsageOfHousehold(
        householdEnergyUsage,
        householdType,
      ),
    };
  });
}

export async function getPotentialEarningsInPenceForHouseholdType(
  householdType: HouseholdType,
): Promise<number> {
  const householdEnergyUsageData = await getHouseholdEnergyUsageData();
  const flexibilityOpportunities = getFlexibilityOpportunities();

  const potentialEarnings = calculatePotentialEarningsInPenceForHouseholdType(
    householdType,
    householdEnergyUsageData,
    flexibilityOpportunities,
  );

  return roundToDecimal(potentialEarnings, 2);
}

function calculatePotentialEarningsInPenceForHouseholdType(
  householdType: HouseholdType,
  householdEnergyUsageData: HouseholdEnergyUsage[],
  flexibilityOpportunities: FlexibilityOpportunity[],
) {
  const energyUsageForHouseholdType = getEnergyUsageDataForHouseholdType(
    householdEnergyUsageData,
    householdType,
  );

  return flexibilityOpportunities.reduce((total, flexibilityOpportunity) => {
    const totalEnergyUsageDuringFlexibilityOpportunity =
      energyUsageForHouseholdType
        .filter(
          (energyUsage) =>
            energyUsage.time >= flexibilityOpportunity.startTime &&
            energyUsage.time < flexibilityOpportunity.endTime,
        )
        .reduce((total, energyUsage) => total + energyUsage.usageInKwh, 0);

    return (
      total +
      calculatePotentialEarningsInPenceDuringFlexibilityOpportunity(
        flexibilityOpportunity,
        totalEnergyUsageDuringFlexibilityOpportunity,
      )
    );
  }, 0);
}

function calculatePotentialEarningsInPenceDuringFlexibilityOpportunity(
  flexibilityOpportunity: FlexibilityOpportunity,
  totalEnergyUsageDuringFlexibilityOpportunity: number,
) {
  switch (flexibilityOpportunity.eventType) {
    case "DEMAND_TURN_DOWN":
      if (
        totalEnergyUsageDuringFlexibilityOpportunity <
        flexibilityOpportunity.minFlexibilityKwh
      ) {
        return 0;
      }

      return (
        flexibilityOpportunity.pricePerKwh *
        Math.min(
          totalEnergyUsageDuringFlexibilityOpportunity,
          flexibilityOpportunity.maxFlexibilityKwh,
        )
      );
    case "DEMAND_TURN_UP":
      return (
        flexibilityOpportunity.maxFlexibilityKwh *
        flexibilityOpportunity.pricePerKwh
      );
    default:
      unreachableSwitchBranch(flexibilityOpportunity.eventType);
  }
}
