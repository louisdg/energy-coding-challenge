import { Request } from "express";

type RequestWithQuery<T> = Request<unknown, unknown, unknown, T>;

export default RequestWithQuery;
