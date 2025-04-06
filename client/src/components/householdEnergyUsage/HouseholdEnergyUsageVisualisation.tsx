import { Divider, Grid } from "@mui/material";
import {
  EnergyUsage,
  HouseholdType,
} from "../../api/householdEnergyUsageApi.ts";
import StatCard from "../StatCard.tsx";

type HouseholdEnergyUsageVisualisationProps = {
  householdType: HouseholdType;
  totalEnergyUsageForHouseholdType: number | null;
  peakEnergyUsageAcrossHouseholds: EnergyUsage | null;
};

function HouseholdEnergyUsageVisualisation({
  householdType,
  totalEnergyUsageForHouseholdType,
  peakEnergyUsageAcrossHouseholds,
}: HouseholdEnergyUsageVisualisationProps) {
  return (
    <>
      <Grid container>
        <StatCard
          stat={
            totalEnergyUsageForHouseholdType
              ? `${totalEnergyUsageForHouseholdType}kWh`
              : null
          }
          label={`Total daily energy usage for a ${householdType} household`}
        />
      </Grid>
      <Divider />
      <Grid container>
        <StatCard
          stat={
            peakEnergyUsageAcrossHouseholds
              ? `${peakEnergyUsageAcrossHouseholds.usageInKwh}kWh`
              : null
          }
          label="Peak energy usage across all households"
        />
        <StatCard
          stat={
            peakEnergyUsageAcrossHouseholds
              ? `${peakEnergyUsageAcrossHouseholds.time}`
              : null
          }
          label="Peak usage time across all households"
        />
      </Grid>
    </>
  );
}

export default HouseholdEnergyUsageVisualisation;
