import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import api from "../../api/api.ts";
import { Stack } from "@mui/material";
import EnergyPricesVisualisation from "./EnergyPricesVisualisation.tsx";
import useApi from "../../hooks/useApi.ts";

function EnergyPricesPage() {
  const [from, setFrom] = useState<Dayjs>(dayjs.utc("2025-03-13T18:00:00Z"));
  const [to, setTo] = useState<Dayjs>(dayjs.utc("2025-03-13T21:00:00Z"));

  const energyPrices = useApi(
    api.energyPrices.getEnergyPrices,
    from.toISOString(),
    to.toISOString(),
  );

  return (
    <Stack>
      <Stack direction="row">
        <DateTimePicker
          label="From"
          value={from}
          onChange={(e) => {
            if (e === null || !e.isValid()) {
              return;
            }

            setFrom(e);
          }}
        />
        <DateTimePicker
          label="To"
          value={to}
          onChange={(e) => {
            if (e === null || !e.isValid()) {
              return;
            }

            setTo(e);
          }}
        />
      </Stack>
      <EnergyPricesVisualisation
        loading={energyPrices === "LOADING"}
        energyPrices={
          energyPrices === "LOADING" || energyPrices === "LOADING_ERROR"
            ? []
            : energyPrices
        }
      />
    </Stack>
  );
}

export default EnergyPricesPage;
