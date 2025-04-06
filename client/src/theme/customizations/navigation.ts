import { Components, Theme } from "@mui/material";

export const navigationCustomizations: Components<Theme> = {
  MuiDrawer: {
    defaultProps: { slotProps: { paper: { elevation: 1 } } },
  },
};
