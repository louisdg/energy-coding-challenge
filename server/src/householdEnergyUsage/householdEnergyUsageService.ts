import {
  EnergyUsage,
  getEnergyUsageOfHousehold,
  HouseholdEnergyUsage,
  HouseholdType,
} from "../model/householdEnergyUsage";
import parseCsv from "../utils/parseCsv";
import roundToDecimal from "../utils/roundToDecimal";

const HOUSEHOLD_ENERGY_USAGE_FILE_PATH = "src/data/household_usage.csv";

export async function getTotalEnergyUsageForHouseholdType(
  householdType: HouseholdType,
): Promise<number> {
  const householdEnergyUsageData = await getHouseholdEnergyUsageData();

  if (householdEnergyUsageData.length === 0) {
    return 0;
  }

  const totalEnergyUsage = householdEnergyUsageData
    .map((householdEnergyUsage) =>
      getEnergyUsageOfHousehold(householdEnergyUsage, householdType),
    )
    .reduce((total, energyUsage) => total + energyUsage);

  return roundToDecimal(totalEnergyUsage, 1);
}

export async function getPeakEnergyUsageAcrossHouseholds(): Promise<EnergyUsage | null> {
  const householdEnergyUsageData = await getHouseholdEnergyUsageData();

  if (householdEnergyUsageData.length === 0) {
    return null;
  }

  return householdEnergyUsageData
    .map(
      (householdEnergyUsage): EnergyUsage => ({
        time: householdEnergyUsage.Time,
        usageInKwh:
          householdEnergyUsage.Standard_Household +
          householdEnergyUsage.HeatPump_Household +
          householdEnergyUsage.HeatPump_Battery_Household,
      }),
    )
    .reduce((peakGlobalEnergyUsage, currentGlobalEnergyUsage) => {
      if (
        currentGlobalEnergyUsage.usageInKwh > peakGlobalEnergyUsage.usageInKwh
      ) {
        return currentGlobalEnergyUsage;
      }

      return peakGlobalEnergyUsage;
    });
}

export function getHouseholdEnergyUsageData() {
  return parseCsv<HouseholdEnergyUsage>(HOUSEHOLD_ENERGY_USAGE_FILE_PATH);
}
