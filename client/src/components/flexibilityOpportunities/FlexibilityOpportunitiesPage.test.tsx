import { act, render, screen } from "@testing-library/react";
import FlexibilityOpportunitiesPage from "./FlexibilityOpportunitiesPage.tsx";
import mocked = jest.mocked;
import api from "../../api/api.ts";

jest.mock("../../api/api", () => ({
  flexibilityOpportunities: {
    getFlexibilityOpportunities: jest.fn(),
  },
}));

describe("FlexibilityOpportunitiesPage", () => {
  it("should render with nothing while the api is being fetched", () => {
    mocked(
      api.flexibilityOpportunities.getFlexibilityOpportunities,
    ).mockReturnValue(new Promise(() => {}));

    render(<FlexibilityOpportunitiesPage />);

    expect(
      api.flexibilityOpportunities.getFlexibilityOpportunities,
    ).toHaveBeenCalled();

    expect(screen.queryByText(/per kWh/i)).not.toBeInTheDocument();
  });

  it("should render correctly when there are no flexibility opportunities", async () => {
    mocked(
      api.flexibilityOpportunities.getFlexibilityOpportunities,
    ).mockResolvedValue([]);

    await act(async () => {
      render(<FlexibilityOpportunitiesPage />);
    });

    expect(
      api.flexibilityOpportunities.getFlexibilityOpportunities,
    ).toHaveBeenCalled();

    expect(screen.queryByText(/per kWh/i)).not.toBeInTheDocument();
  });

  it("should render correctly when there are flexibility opportunities", async () => {
    mocked(
      api.flexibilityOpportunities.getFlexibilityOpportunities,
    ).mockResolvedValue([
      { pricePerKwh: 123.45, startTime: "17:30", endTime: "20:30" },
    ]);

    await act(async () => {
      render(<FlexibilityOpportunitiesPage />);
    });

    expect(
      api.flexibilityOpportunities.getFlexibilityOpportunities,
    ).toHaveBeenCalled();

    expect(screen.getByText("£1.2345 per kWh")).toBeVisible();
    expect(screen.getByText("From 17:30 to 20:30")).toBeVisible();
  });
});
