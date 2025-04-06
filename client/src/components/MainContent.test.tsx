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
});
