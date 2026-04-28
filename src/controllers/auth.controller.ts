import { RequestHandler } from "express";
import { authLoginSchema } from "../validators/auth.validator";
import * as userService from "../services/user.service";
import { AppError } from "../utils/apperror";

export const login: RequestHandler = async (req, res) => {
    console.log(req.body)
  const data = authLoginSchema.parse(req.body);
  const result = await userService.login(data.email, data.password);
  if (!result) {
    throw new AppError("Credenciais inválidas", 401);
  }
  res.status(201).json({ error: null, data: result });
};
