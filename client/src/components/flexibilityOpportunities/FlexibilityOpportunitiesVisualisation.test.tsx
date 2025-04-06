import { render, screen } from "@testing-library/react";
import FlexibilityOpportunitiesVisualisation from "./FlexibilityOpportunitiesVisualisation.tsx";

describe("FlexibilityOpportunitiesVisualisation", () => {
  it("should correctly when there are no flexibility opportunities", () => {
    render(
      <FlexibilityOpportunitiesVisualisation flexibilityOpportunities={[]} />,
    );

    expect(screen.queryByText(/per kWh/i)).not.toBeInTheDocument();
  });
  it("should correctly when there are flexibility opportunities", () => {
    render(
      <FlexibilityOpportunitiesVisualisation
        flexibilityOpportunities={[
          { pricePerKwh: 123.45, startTime: "17:30", endTime: "20:30" },
          { pricePerKwh: 678.9, startTime: "23:00", endTime: "00:30" },
        ]}
      />,
    );

    expect(screen.getByText("£1.2345 per kWh")).toBeVisible();
    expect(screen.getByText("From 17:30 to 20:30")).toBeVisible();

    expect(screen.getByText("£6.789 per kWh")).toBeVisible();
    expect(screen.getByText("From 23:00 to 00:30")).toBeVisible();
  });
});
