import validationErrorHandler from "./validationErrorHandler";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import mocked = jest.mocked;

jest.mock("express-validator", () => ({
  validationResult: jest.fn(),
}));

describe("validationErrorHandler", () => {
  let mockRequest: Request;
  let mockResponse: Response;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {} as Request;
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    mockNext = jest.fn();
  });

  it("should call next when there are no validation errors", () => {
    mocked(validationResult).mockReturnValueOnce({
      isEmpty: () => true,
    } as ReturnType<typeof validationResult>);

    validationErrorHandler(mockRequest, mockResponse, mockNext);

    expect(validationResult).toHaveBeenCalledWith(mockRequest);
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.send).not.toHaveBeenCalled();
  });

  it("should return 400 status and send response when there are validation errors", () => {
    mocked(validationResult).mockReturnValueOnce({
      isEmpty: () => false,
    } as ReturnType<typeof validationResult>);

    validationErrorHandler(mockRequest, mockResponse, mockNext);

    expect(validationResult).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });
});
