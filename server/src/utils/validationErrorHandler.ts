import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validationErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send();
    return;
  }

  next();
};

export default validationErrorHandler;
