import { getByText, render, screen } from "@testing-library/react";
import EnergyPricesVisualisation from "./EnergyPricesVisualisation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

describe("EnergyPricesVisualisation", () => {
  beforeEach(() => {
    dayjs.extend(utc);
  });

  it("should render dashes in the stat cards and a loading chart when loading is true", () => {
    render(<EnergyPricesVisualisation loading={true} energyPrices={[]} />);

    expect(screen.getAllByText("-")).toHaveLength(4);

    expect(screen.getByText("Loading data…")).toBeVisible();
  });

  it("should render dashes in the stat cards and an empty chart when loading is false and no energy prices are available", () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EnergyPricesVisualisation loading={false} energyPrices={[]} />,
      </LocalizationProvider>,
    );

    expect(screen.getAllByText("-")).toHaveLength(4);

    expect(screen.getByText("No data to display")).toBeVisible();
  });

  it("should render stat cards with correct values when it is not loading", () => {
    const energyPrices = [
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

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EnergyPricesVisualisation
          loading={false}
          energyPrices={energyPrices}
        />
      </LocalizationProvider>,
    );

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
});
