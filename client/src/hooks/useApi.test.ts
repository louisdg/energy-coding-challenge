import { renderHook, act } from "@testing-library/react";
import useApi from "./useApi";

describe("useApi", () => {
  it("should initially return LOADING", () => {
    const mockedApiFetchFn = jest.fn().mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useApi(mockedApiFetchFn));
    expect(result.current).toBe("LOADING");
  });

  it("should return LOADING_ERROR when the api call fails", async () => {
    const mockApiFetchFn = jest.fn().mockRejectedValue("error");
    const { result, rerender } = renderHook(() => useApi(mockApiFetchFn));

    await act(async () => {
      rerender();
    });

    expect(mockApiFetchFn).toHaveBeenCalledTimes(1);
    expect(result.current).toBe("LOADING_ERROR");
  });

  it("should return fetched data when the api call succeeds", async () => {
    const mockedApiFetchFn = jest.fn().mockResolvedValue("fetched data");
    const { result, rerender } = renderHook(() => useApi(mockedApiFetchFn));

    await act(async () => {
      rerender();
    });

    expect(mockedApiFetchFn).toHaveBeenCalledTimes(1);
    expect(result.current).toBe("fetched data");
  });

  it("should call the api with the correct parameters", async () => {
    const parameters = ["parameter 1", "parameter 2"];
    const mockedApiFetchFn = jest.fn((...params: unknown[]) =>
      Promise.resolve(`fetched data with parameters ${params.join(", ")}`),
    );
    const { result, rerender } = renderHook(() =>
      useApi(mockedApiFetchFn, ...parameters),
    );

    await act(async () => {
      rerender();
    });

    expect(mockedApiFetchFn).toHaveBeenCalledWith(...parameters);
    expect(result.current).toBe(
      "fetched data with parameters parameter 1, parameter 2",
    );
  });
});
