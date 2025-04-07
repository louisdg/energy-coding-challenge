import { Components, Theme } from "@mui/material";
import spacing from "../spacing.ts";

export const dataDisplayCustomizations: Components<Theme> = {
  MuiList: {
    defaultProps: {
      disablePadding: true,
    },
  },
  MuiListItem: {
    defaultProps: {
      disablePadding: true,
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: 8,
        padding: spacing.lg,
      },
    },
  },
  MuiMenuItem: {
    defaultProps: {},
    styleOverrides: {
      gutters: { paddingLeft: spacing.xl, paddingRight: spacing.xl },
    },
  },
};
