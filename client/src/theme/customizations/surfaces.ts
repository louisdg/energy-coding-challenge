import { Components, Theme } from "@mui/material";

export const surfacesCustomizations: Components<Theme> = {
  MuiCard: {
    defaultProps: {
      variant: "outlined",
    },
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        "&:last-child": {
          paddingBottom: 16,
        },
      },
    },
  },
};
