import { render, screen } from "@testing-library/react";
import AppLinks from "./AppLinks";
import routerLinks from "../router/routerLinks.tsx";
import { MemoryRouter } from "react-router";

describe("AppLinks", () => {
  it("should render a list of router links with correct titles and href", () => {
    render(
      <MemoryRouter>
        <AppLinks />
      </MemoryRouter>,
    );

    routerLinks.forEach((routerLink) => {
      expect(
        screen.getByRole("link", { name: routerLink.title }),
      ).toHaveProperty("href", `http://localhost${routerLink.href}`);
    });
  });
});
