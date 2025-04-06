import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AppLink from "./AppLink";

describe("AppLink", () => {
  it("should render correctly with given props", () => {
    render(
      <MemoryRouter>
        <AppLink
          routerLink={{
            href: "/cool-page",
            icon: <div>Icon</div>,
            title: "Cool page",
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveProperty(
      "href",
      "http://localhost/cool-page",
    );
    expect(screen.getByText("Icon")).toBeVisible();
  });
});
