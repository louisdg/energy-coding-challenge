import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MainContent from "./MainContent";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

describe("MainContent", () => {
  beforeEach(() => {
    dayjs.extend(utc);
  });

  it("should render the energy prices page when the route matches", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MemoryRouter initialEntries={["/energy-prices"]}>
          <MainContent />
        </MemoryRouter>
      </LocalizationProvider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("Energy prices");
    expect(screen.getByText("Energy prices")).toBeVisible();
  });

  it("should render the household energy usage page when the route matches", () => {
    render(
      <MemoryRouter initialEntries={["/household-energy-usage"]}>
        <MainContent />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("Household energy usage");
    expect(screen.getByText("Household energy usage")).toBeVisible();
  });

  it("should render the flexibility opportunities page when the route matches", () => {
    render(
      <MemoryRouter initialEntries={["/flexibility-opportunities"]}>
        <MainContent />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("Flexibility opportunities");
    expect(screen.getByText("Flexibility opportunities")).toBeVisible();
  });

  it("should redirect to the energy prices page when no routes match", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MemoryRouter initialEntries={["/not-a-route"]}>
          <MainContent />
        </MemoryRouter>
      </LocalizationProvider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
      }),
    ).toHaveTextContent("Energy prices");
    expect(screen.getByText("Energy prices")).toBeVisible();
  });
});
