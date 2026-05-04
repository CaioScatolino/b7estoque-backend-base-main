import { RequestHandler } from "express";
import { AppError } from "../utils/apperror";
import * as UserService from "../services/user.service";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const nonAuthorizedError = new AppError("Nao autorizado", 401);

  // Verifiar se está logado
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(nonAuthorizedError);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(nonAuthorizedError);
  }

  const user = await UserService.validateToken(token);

  if (!user) {
    return next(nonAuthorizedError);
  }

  req.user = user;

  next();
};
