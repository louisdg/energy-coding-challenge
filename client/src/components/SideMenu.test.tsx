import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SideMenu from "./SideMenu";
import routerLinks from "../router/routerLinks.tsx";

describe("SideMenu", () => {
  it("should render a list of router links with correct titles and href", () => {
    render(
      <MemoryRouter>
        <SideMenu />
      </MemoryRouter>,
    );

    routerLinks.forEach((routerLink) => {
      expect(
        screen.getByRole("link", { name: routerLink.title }),
      ).toHaveProperty("href", `http://localhost${routerLink.href}`);
    });
  });
});
