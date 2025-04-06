import { render, screen } from "@testing-library/react";
import AppWrapper from "./AppWrapper";

describe("AppWrapper", () => {
  it("should render its children within its providers", () => {
    render(
      <AppWrapper>
        <div>Children</div>;
      </AppWrapper>,
    );

    expect(screen.getByText("Children")).toBeVisible();
  });
});
