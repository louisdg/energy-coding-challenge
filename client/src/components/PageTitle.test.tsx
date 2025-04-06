import { render, screen } from "@testing-library/react";
import PageTitle from "./PageTitle";
import { MemoryRouter } from "react-router";

describe("PageTitle", () => {
  it("should render the page title of the current route", () => {
    render(
      <MemoryRouter initialEntries={["/energy-prices"]}>
        <PageTitle />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Energy prices",
    );
  });

  it("should render no text if on an unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/not-a-route"]}>
        <PageTitle />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("");
  });
});
