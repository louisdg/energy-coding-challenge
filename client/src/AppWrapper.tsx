import { ReactNode } from "react";
import { BrowserRouter } from "react-router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "./theme/theme.ts";

dayjs.extend(utc);

function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default AppWrapper;
