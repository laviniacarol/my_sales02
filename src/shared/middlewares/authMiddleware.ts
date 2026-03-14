import { NextFunction, Response, Request } from "express";
import { Secret, verify } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";

interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export default class AuthMiddleware {
  static execute(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Token is missing" });
      return;
    }

    const [, token] = authHeader.split(" ");

    try {
      const decodedToken = verify(token, process.env.APP_SECRET as Secret);
      const { sub } = decodedToken as ITokenPayload;

      req.user = {
        id: sub,
      };

      next();
    } catch {
      return next(new AppError("Invalid token", 401));
    }
  }
}
