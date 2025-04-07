import { Grid } from "@mui/material";
import StatCard from "../StatCard.tsx";
import { formatCurrency } from "../../utils/currencyFormatting.ts";
import { ChartsReferenceLine, LineChart, LineSeriesType } from "@mui/x-charts";
import { EnergyPrice } from "../../api/energyPricesApi.ts";
import { useMemo } from "react";
import dayjs from "dayjs";
import {
  calculateAverage,
  calculateMaximum,
  calculateMinimum,
} from "../../utils/statCalculations.ts";

type EnergyPricesVisualisationProps = {
  loading: boolean;
  energyPrices: EnergyPrice[];
};

function EnergyPricesVisualisation({
  loading,
  energyPrices,
}: EnergyPricesVisualisationProps) {
  const sortedEnergyPricesDates = useMemo(() => {
    return energyPrices
      .map((energyPrice) => dayjs.utc(energyPrice.validFrom).toDate())
      .sort((a, b) => a.valueOf() - b.valueOf());
  }, [energyPrices]);

  const stats = useMemo(() => {
    if (energyPrices.length === 0) {
      return null;
    }

    return {
      averageEnergyPriceExcVat: calculateAverage(
        energyPrices.map((energyPrice) => energyPrice.valueExcVatInPence),
      ),
      averageEnergyPriceIncVat: calculateAverage(
        energyPrices.map((energyPrice) => energyPrice.valueIncVatInPence),
      ),
      lowestPriceIncVat: calculateMinimum(
        energyPrices.map((energyPrice) => energyPrice.valueIncVatInPence),
      ),
      highestPriceIncVat: calculateMaximum(
        energyPrices.map((energyPrice) => energyPrice.valueIncVatInPence),
      ),
    };
  }, [energyPrices]);

  const dataOptions: Partial<LineSeriesType> = {
    valueFormatter: (value) => (value ? formatCurrency(value) : null),
  };

  return (
    <>
      <Grid container>
        <StatCard
          stat={formatCurrency(stats?.averageEnergyPriceExcVat)}
          label="Average price (exc. VAT)"
        />
        <StatCard
          stat={formatCurrency(stats?.averageEnergyPriceIncVat)}
          label="Average price (inc. VAT)"
        />
        <StatCard
          stat={formatCurrency(stats?.lowestPriceIncVat)}
          label="Lowest price (inc. VAT)"
        />
        <StatCard
          stat={formatCurrency(stats?.highestPriceIncVat)}
          label="Highest price (inc. VAT)"
        />
      </Grid>
      <LineChart
        loading={loading}
        xAxis={[
          {
            label: "Time",
            data: sortedEnergyPricesDates,
            scaleType: "utc",
          },
        ]}
        yAxis={[
          {
            label: "Price",
            valueFormatter: (value) => formatCurrency(value)!,
          },
        ]}
        series={[
          {
            label: "Energy price (inc. VAT)",
            data: energyPrices.map(
              (energyPrice) => energyPrice.valueIncVatInPence,
            ),
            ...dataOptions,
          },
          {
            label: "Energy price (exc. VAT)",
            data: energyPrices.map(
              (energyPrice) => energyPrice.valueExcVatInPence,
            ),
            ...dataOptions,
          },
        ]}
        height={480}
      >
        {stats && (
          <ChartsReferenceLine
            y={stats.averageEnergyPriceIncVat}
            label="Average price (inc. VAT)"
            labelStyle={{ fontSize: 12 }}
            lineStyle={{
              strokeDasharray: "6 4",
            }}
          />
        )}
      </LineChart>
    </>
  );
}

export default EnergyPricesVisualisation;
