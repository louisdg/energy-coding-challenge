import { render, screen } from "@testing-library/react";
import StatCard from "./StatCard";

describe("StatCard", () => {
  it("should stat and label correctly", () => {
    render(<StatCard stat={25} label="Number of coffees drunk today" />);

    expect(screen.getByText("25")).toBeVisible();
    expect(screen.getByText("Number of coffees drunk today")).toBeVisible();
  });

  it("should display a dash when stat is null", () => {
    render(<StatCard stat={null} label="Number of coffees drunk today" />);

    expect(screen.getByText("-")).toBeVisible();
    expect(screen.getByText("Number of coffees drunk today")).toBeVisible();
  });
});
