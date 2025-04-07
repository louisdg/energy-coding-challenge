import { getByText, render, screen } from "@testing-library/react";
import StatCard from "./StatCard";

describe("StatCard", () => {
  it("should stat and label correctly", () => {
    render(<StatCard stat={25} label="Number of coffees drunk today" />);

    const statCard = screen.getByRole("region", {
      name: "Number of coffees drunk today",
    });
    expect(statCard).toBeVisible();
    expect(getByText(statCard, "25")).toBeVisible();
  });

  it("should display a dash when stat is null", () => {
    render(<StatCard stat={null} label="Number of coffees drunk today" />);

    const statCard = screen.getByRole("region", {
      name: "Number of coffees drunk today",
    });
    expect(statCard).toBeVisible();
    expect(getByText(statCard, "-")).toBeVisible();
  });
});
