import { renderHook } from "@testing-library/react";
import usePageTitle from "./usePageTitle";
import { Location, useLocation } from "react-router";
import mocked = jest.mocked;

jest.mock("react-router");

describe("usePageTitle", () => {
  it("should return the initial page title based on the current location", () => {
    mocked(useLocation).mockReturnValue({
      pathname: "/energy-prices",
    } as unknown as Location);

    const { result } = renderHook(() => usePageTitle());

    expect(result.current).toBe("Energy prices");
  });

  it("should update the page title when the location changes", () => {
    let mockedLocation = { pathname: "/some-route" } as unknown as Location;
    mocked(useLocation).mockImplementation(() => mockedLocation);

    const { result, rerender } = renderHook(() => usePageTitle());

    expect(result.current).toBe(null);

    mockedLocation = { pathname: "/energy-prices" } as unknown as Location;
    rerender();

    expect(result.current).toBe("Energy prices");
  });
});
