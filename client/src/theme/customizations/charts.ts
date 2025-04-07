import { Theme } from "@mui/material";
import type { ChartsComponents } from "@mui/x-charts/themeAugmentation";
import typography from "../typography.ts";
import { chartsGridClasses, legendClasses } from "@mui/x-charts";

export const chartsCustomizations = (
  defaultTheme: Theme,
): ChartsComponents<Theme> => ({
  MuiChartsGrid: {
    styleOverrides: {
      root: {
        [`& .${chartsGridClasses.line}`]: {
          strokeDasharray: "6 4",
        },
      },
    },
  },
  MuiChartsLegend: {
    styleOverrides: {
      root: {
        [`& .${legendClasses.mark}`]: {
          rx: 4,
        },
      },
    },
  },
  MuiLineChart: {
    defaultProps: {
      grid: { horizontal: true },
      slotProps: {
        legend: {
          labelStyle: {
            fontSize: typography(defaultTheme).caption?.fontSize,
          },
        },
      },
    },
  },
});
