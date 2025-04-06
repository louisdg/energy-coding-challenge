import { Components, Theme } from "@mui/material";

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
};
