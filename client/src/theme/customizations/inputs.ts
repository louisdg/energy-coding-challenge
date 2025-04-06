import { Components, Theme } from "@mui/material";

export const inputsCustomizations: Components<Theme> = {
  MuiButtonBase: {
    defaultProps: { disableRipple: true },
  },
};
