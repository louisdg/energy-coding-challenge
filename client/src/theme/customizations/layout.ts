import { Components, Theme } from "@mui/material";
import spacing from "../spacing.ts";

export const layoutCustomizations: Components<Theme> = {
  MuiGrid: {
    defaultProps: { spacing: spacing.sm },
  },
  MuiStack: {
    defaultProps: {
      spacing: spacing.sm,
    },
  },
};
