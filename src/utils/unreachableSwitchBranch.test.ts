import unreachableSwitchBranch from "./unreachableSwitchBranch";

describe("unreachableSwitchBranch", () => {
  it("should throw an error when called", () => {
    expect(() => unreachableSwitchBranch("unexpectedValue" as never)).toThrow(
      "Unreachable switch branch",
    );
  });
});
