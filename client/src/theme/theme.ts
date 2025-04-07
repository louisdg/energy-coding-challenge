import { createTheme } from "@mui/material";
import { dataDisplayCustomizations } from "./customizations/dataDisplay.ts";
import { layoutCustomizations } from "./customizations/layout.ts";
import { surfacesCustomizations } from "./customizations/surfaces.ts";
import { navigationCustomizations } from "./customizations/navigation.ts";
import { inputsCustomizations } from "./customizations/inputs.ts";
import { chartsCustomizations } from "./customizations/charts.ts";
import typography from "./typography.ts";

const defaultTheme = createTheme({ colorSchemes: { dark: true } });

const theme = createTheme({
  colorSchemes: { dark: true },
  typography: typography(defaultTheme),
  components: {
    ...inputsCustomizations,
    ...dataDisplayCustomizations,
    ...layoutCustomizations,
    ...navigationCustomizations,
    ...surfacesCustomizations,
    ...chartsCustomizations(defaultTheme),
  },
});

export default theme;
