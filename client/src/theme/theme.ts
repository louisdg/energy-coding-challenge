import { createTheme } from "@mui/material";
import { dataDisplayCustomizations } from "./customizations/dataDisplay.ts";
import { layoutCustomizations } from "./customizations/layout.ts";
import { surfacesCustomizations } from "./customizations/surfaces.ts";
import { navigationCustomizations } from "./customizations/navigation.ts";
import { inputsCustomizations } from "./customizations/inputs.ts";

const theme = createTheme({
  colorSchemes: { dark: true },
  components: {
    ...inputsCustomizations,
    ...dataDisplayCustomizations,
    ...layoutCustomizations,
    ...navigationCustomizations,
    ...surfacesCustomizations,
  },
});

export default theme;
