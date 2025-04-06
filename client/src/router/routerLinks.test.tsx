import { getPageTitle } from "./routerLinks";

describe("routerLinks", () => {
  describe("getPageTitle", () => {
    it("should return the correct title for an exact match", () => {
      const pageTitle = getPageTitle("/energy-prices");
      expect(pageTitle).toBe("Energy prices");
    });

    it("should return the correct title for a nested route", () => {
      const pageTitle = getPageTitle("/energy-prices/some-nested-route");
      expect(pageTitle).toBe("Energy prices");
    });

    it("should return null if no matching route is found", () => {
      const pageTitle = getPageTitle("/not-a-route");
      expect(pageTitle).toBeNull();
    });

    it("should return null if the pathname is empty", () => {
      const pageTitle = getPageTitle("");
      expect(pageTitle).toBeNull();
    });
  });
});
