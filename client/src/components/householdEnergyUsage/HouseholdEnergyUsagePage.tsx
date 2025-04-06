import { useState } from "react";
import api from "../../api/api.ts";
import { MenuItem, Stack, TextField } from "@mui/material";
import useApi from "../../hooks/useApi.ts";
import {
  HouseholdType,
  HouseholdTypes,
} from "../../api/householdEnergyUsageApi.ts";
import HouseholdEnergyUsageVisualisation from "./HouseholdEnergyUsageVisualisation.tsx";

function HouseholdEnergyUsagePage() {
  const [householdType, setHouseholdType] = useState<HouseholdType>("STANDARD");

  const totalEnergyUsageForHouseholdType = useApi(
    api.householdEnergyUsage.getTotalEnergyUsageForHouseholdType,
    householdType,
  );

  const peakEnergyUsageAcrossHouseholds = useApi(
    api.householdEnergyUsage.getPeakEnergyUsageAcrossHouseholds,
  );

  return (
    <Stack>
      <TextField
        select
        label="Household type"
        value={householdType}
        onChange={(e) => {
          setHouseholdType(e.target.value as HouseholdType);
        }}
      >
        {HouseholdTypes.map((householdType) => (
          <MenuItem key={householdType} value={householdType}>
            {householdType}
          </MenuItem>
        ))}
      </TextField>
      <HouseholdEnergyUsageVisualisation
        householdType={householdType}
        totalEnergyUsageForHouseholdType={
          totalEnergyUsageForHouseholdType === "LOADING" ||
          totalEnergyUsageForHouseholdType === "LOADING_ERROR"
            ? null
            : totalEnergyUsageForHouseholdType
        }
        peakEnergyUsageAcrossHouseholds={
          peakEnergyUsageAcrossHouseholds === "LOADING" ||
          peakEnergyUsageAcrossHouseholds === "LOADING_ERROR"
            ? null
            : peakEnergyUsageAcrossHouseholds
        }
      />
    </Stack>
  );
}

export default HouseholdEnergyUsagePage;
