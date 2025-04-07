import { Components, Theme } from "@mui/material";

export const inputsCustomizations: Components<Theme> = {
  MuiButtonBase: {
    defaultProps: { disableRipple: true },
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
      notchedOutline: {
        transition: "border-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: { backgroundColor: "#ffffff0f" },
    },
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
    },
  },
};
