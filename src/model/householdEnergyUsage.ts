import unreachableSwitchBranch from "../utils/unreachableSwitchBranch";

export const HouseholdTypes = [
  "STANDARD",
  "HEAT_PUMP",
  "HEAT_PUMP_BATTERY",
] as const;
export type HouseholdType = (typeof HouseholdTypes)[number];

export type HouseholdEnergyUsage = {
  Time: string;
  Standard_Household: number;
  HeatPump_Household: number;
  HeatPump_Battery_Household: number;
};

export type EnergyUsage = {
  time: string;
  usageInKwh: number;
};

export function getEnergyUsageOfHousehold(
  energyUsage: HouseholdEnergyUsage,
  householdType: HouseholdType,
) {
  switch (householdType) {
    case "STANDARD":
      return energyUsage.Standard_Household;
    case "HEAT_PUMP":
      return energyUsage.HeatPump_Household;
    case "HEAT_PUMP_BATTERY":
      return energyUsage.HeatPump_Battery_Household;
    default:
      unreachableSwitchBranch(householdType);
  }
}
