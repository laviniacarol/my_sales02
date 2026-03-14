import AppError from "@shared/errors/AppError";
import { isCelebrateError } from "celebrate";
import { NextFunction, Request, Response } from "express";

class ErrorHandleMiddleware {
  public static handleErrors(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    void req;
    void next;

    if (isCelebrateError(error)) {
      const details = error.details.get("body");
      const message = details?.details?.[0]?.message || "Validation failed";

      return res.status(400).json({
        status: "error",
        message,
      });
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export default ErrorHandleMiddleware;
