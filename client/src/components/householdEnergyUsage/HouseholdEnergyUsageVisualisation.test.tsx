import { render, screen } from "@testing-library/react";
import HouseholdEnergyUsageVisualisation from "./HouseholdEnergyUsageVisualisation";

describe("HouseholdEnergyUsageVisualisation", () => {
  it("should render dashes in the stat cards when values are null", () => {
    render(
      <HouseholdEnergyUsageVisualisation
        householdType="STANDARD"
        totalEnergyUsageForHouseholdType={null}
        peakEnergyUsageAcrossHouseholds={null}
      />,
    );

    expect(screen.getAllByText("-")).toHaveLength(3);
  });

  it("should render the total energy usage for the given household type", () => {
    render(
      <HouseholdEnergyUsageVisualisation
        householdType="STANDARD"
        totalEnergyUsageForHouseholdType={150}
        peakEnergyUsageAcrossHouseholds={null}
      />,
    );

    expect(
      screen.getByText("Total daily energy usage for a STANDARD household"),
    ).toBeVisible();
    expect(screen.getByText("150kWh")).toBeVisible();
  });

  it("should render peak energy usage across all households and time", () => {
    render(
      <HouseholdEnergyUsageVisualisation
        householdType="STANDARD"
        totalEnergyUsageForHouseholdType={null}
        peakEnergyUsageAcrossHouseholds={{
          usageInKwh: 200,
          time: "15:00",
        }}
      />,
    );

    expect(
      screen.getByText("Peak energy usage across all households"),
    ).toBeVisible();
    expect(screen.getByText("200kWh")).toBeVisible();

    expect(
      screen.getByText("Peak usage time across all households"),
    ).toBeVisible();
    expect(screen.getByText("15:00")).toBeVisible();
  });
});
