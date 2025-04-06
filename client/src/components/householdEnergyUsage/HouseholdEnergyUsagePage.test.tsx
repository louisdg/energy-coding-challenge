import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HouseholdEnergyUsagePage from "./HouseholdEnergyUsagePage";
import mocked = jest.mocked;
import api from "../../api/api.ts";
import { userEvent } from "@testing-library/user-event";

jest.mock("../../api/api", () => ({
  householdEnergyUsage: {
    getTotalEnergyUsageForHouseholdType: jest.fn(),
    getPeakEnergyUsageAcrossHouseholds: jest.fn(),
  },
}));

describe("HouseholdEnergyUsagePage", () => {
  it("should render with default values while the api is being fetched", async () => {
    mocked(
      api.householdEnergyUsage.getTotalEnergyUsageForHouseholdType,
    ).mockReturnValue(new Promise(() => {}));
    mocked(
      api.householdEnergyUsage.getPeakEnergyUsageAcrossHouseholds,
    ).mockReturnValue(new Promise(() => {}));

    render(<HouseholdEnergyUsagePage />);

    expect(
      api.householdEnergyUsage.getTotalEnergyUsageForHouseholdType,
    ).toHaveBeenCalledWith("STANDARD");
    expect(
      api.householdEnergyUsage.getPeakEnergyUsageAcrossHouseholds,
    ).toHaveBeenCalled();

    expect(screen.getByLabelText("Household type")).toHaveTextContent(
      "STANDARD",
    );

    expect(screen.getAllByText("-")).toHaveLength(3);
  });

  it("should render correctly when data is fetched", async () => {
    mocked(
      api.householdEnergyUsage.getTotalEnergyUsageForHouseholdType,
    ).mockResolvedValue(123);
    mocked(
      api.householdEnergyUsage.getPeakEnergyUsageAcrossHouseholds,
    ).mockResolvedValue({
      usageInKwh: 456,
      time: "17:30",
    });

    await act(async () => {
      render(<HouseholdEnergyUsagePage />);
    });

    expect(screen.getByLabelText("Household type")).toHaveTextContent(
      "STANDARD",
    );

    expect(
      api.householdEnergyUsage.getTotalEnergyUsageForHouseholdType,
    ).toHaveBeenCalledWith("STANDARD");
    expect(
      api.householdEnergyUsage.getPeakEnergyUsageAcrossHouseholds,
    ).toHaveBeenCalled();

    expect(screen.getByText("123kWh")).toBeVisible();
    expect(screen.getByText("456kWh")).toBeVisible();
    expect(screen.getByText("17:30")).toBeVisible();
  });

  it("should fetch again the api when household type is changed", async () => {
    mocked(
      api.householdEnergyUsage.getTotalEnergyUsageForHouseholdType,
    ).mockResolvedValue(123);
    mocked(
      api.householdEnergyUsage.getPeakEnergyUsageAcrossHouseholds,
    ).mockResolvedValue({
      usageInKwh: 456,
      time: "17:30",
    });

    await act(async () => {
      render(<HouseholdEnergyUsagePage />);
    });

    expect(
      api.householdEnergyUsage.getTotalEnergyUsageForHouseholdType,
    ).toHaveBeenCalledWith("STANDARD");

    expect(screen.getByLabelText("Household type")).toHaveTextContent(
      "STANDARD",
    );

    await userEvent.click(screen.getByLabelText("Household type"));
    await userEvent.click(screen.getByRole("option", { name: "HEAT_PUMP" }));

    expect(screen.getByLabelText("Household type")).toHaveTextContent(
      "HEAT_PUMP",
    );
    expect(
      api.householdEnergyUsage.getTotalEnergyUsageForHouseholdType,
    ).toHaveBeenCalledWith("HEAT_PUMP");
  });
});
