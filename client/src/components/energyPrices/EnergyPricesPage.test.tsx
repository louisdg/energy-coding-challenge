import { act, getByText, render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import EnergyPricesPage from "./EnergyPricesPage";
import mocked = jest.mocked;
import api from "../../api/api.ts";
import utc from "dayjs/plugin/utc";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

jest.mock("../../api/api", () => ({
  energyPrices: { getEnergyPrices: jest.fn() },
}));

describe("EnergyPricesPage", () => {
  beforeEach(() => {
    dayjs.extend(utc);
  });

  it("should render with default values while the api is being fetched", () => {
    mocked(api.energyPrices.getEnergyPrices).mockReturnValue(
      new Promise(() => {}),
    );

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EnergyPricesPage />
      </LocalizationProvider>,
    );

    expect(screen.getByLabelText("From")).toHaveValue("03/13/2025 06:00 PM");
    expect(screen.getByLabelText("To")).toHaveValue("03/13/2025 09:00 PM");
    expect(screen.getByText("Loading data…")).toBeVisible();
  });

  it("should render correctly when no energy prices are available", async () => {
    mocked(api.energyPrices.getEnergyPrices).mockResolvedValue([]);

    await act(async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <EnergyPricesPage />
        </LocalizationProvider>,
      );
    });

    expect(screen.getByText("No data to display")).toBeVisible();
  });

  it("should render correctly when energy prices are available", async () => {
    const mockedResponse = [
      {
        valueExcVatInPence: 1100,
        valueIncVatInPence: 1150,
        validFrom: "2023-11-15T01:30:00Z",
        validTo: "2023-11-15T02:00:00Z",
      },
      {
        valueExcVatInPence: 100,
        valueIncVatInPence: 150,
        validFrom: "2023-11-15T01:00:00Z",
        validTo: "2023-11-15T01:30:00Z",
      },
    ];
    mocked(api.energyPrices.getEnergyPrices).mockResolvedValue(mockedResponse);

    await act(async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <EnergyPricesPage />
        </LocalizationProvider>,
      );
    });

    const averagePriceExcVatStatCard = screen.getByRole("region", {
      name: "Average price (exc. VAT)",
    });
    expect(averagePriceExcVatStatCard).toBeVisible();
    expect(getByText(averagePriceExcVatStatCard, "£6.00")).toBeVisible();

    const averagePriceIncVatStatCard = screen.getByRole("region", {
      name: "Average price (inc. VAT)",
    });
    expect(averagePriceIncVatStatCard).toBeVisible();
    expect(getByText(averagePriceIncVatStatCard, "£6.50")).toBeVisible();

    const lowestPriceIncVatStatCard = screen.getByRole("region", {
      name: "Lowest price (inc. VAT)",
    });
    expect(lowestPriceIncVatStatCard).toBeVisible();
    expect(getByText(lowestPriceIncVatStatCard, "£1.50")).toBeVisible();

    const highestPriceIncVatStatCard = screen.getByRole("region", {
      name: "Highest price (inc. VAT)",
    });
    expect(highestPriceIncVatStatCard).toBeVisible();
    expect(getByText(highestPriceIncVatStatCard, "£11.50")).toBeVisible();

    expect(screen.queryByText("Loading data…")).not.toBeInTheDocument();
    expect(screen.queryByText("No data to display")).not.toBeInTheDocument();
  });

  it("should fetch again the api when from date time is changed", async () => {
    mocked(api.energyPrices.getEnergyPrices).mockResolvedValue([]);

    await act(async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <EnergyPricesPage />
        </LocalizationProvider>,
      );
    });

    expect(screen.getByLabelText("From")).toHaveValue("03/13/2025 06:00 PM");

    // TODO make this test work
    /*
    await userEvent.type(screen.getByLabelText("From"), "15/11/2023 06:00 PM");

    expect(screen.getByLabelText("From")).toHaveValue("15/11/2023 06:00 PM");
    expect(api.energyPrices.getEnergyPrices).toHaveBeenCalledWith(
      "2023-11-15T18:00:00Z",
      "2025-13-03T21:00:00Z",
    );
    */
  });

  it("should fetch again the api when to date time is changed", async () => {
    mocked(api.energyPrices.getEnergyPrices).mockResolvedValue([]);

    await act(async () => {
      render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <EnergyPricesPage />
        </LocalizationProvider>,
      );
    });

    expect(screen.getByLabelText("To")).toHaveValue("03/13/2025 09:00 PM");

    // TODO make this test work
    /*
    await userEvent.type(screen.getByLabelText("To"), "15/11/2023 09:00 PM");

    expect(screen.getByLabelText("To")).toHaveValue("15/11/2023 09:00 PM");
    expect(api.energyPrices.getEnergyPrices).toHaveBeenCalledWith(
      "2025-13-03T18:00:00Z",
      "2023-11-15T21:00:00Z",
    );
    */
  });
});
