import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

describe("App", () => {
  beforeEach(() => {
    dayjs.extend(utc);
  });

  it("should render the side menu", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MemoryRouter initialEntries={["/energy-prices"]}>
          <App />
        </MemoryRouter>
      </LocalizationProvider>,
    );

    expect(screen.getByRole("link", { name: "Energy prices" })).toBeVisible();
  });

  it("should render the main content", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MemoryRouter initialEntries={["/energy-prices"]}>
          <App />
        </MemoryRouter>
      </LocalizationProvider>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Energy prices",
    );
  });
});
