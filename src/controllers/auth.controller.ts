import { RequestHandler } from "express";
import { authLoginSchema } from "../validators/auth.validator";
import * as userService from "../services/user.service";
import { AppError } from "../utils/apperror";

export const login: RequestHandler = async (req, res) => {
  console.log(req.body);
  const data = authLoginSchema.parse(req.body);
  const result = await userService.login(data.email, data.password);
  if (!result) {
    throw new AppError("Credenciais inválidas", 401);
  }
  res.status(201).json({ error: null, data: result });
};

export const logout: RequestHandler = async (req, res) => {
  console.log("req.body", req.body);

  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("token", token);
    if (token) {
      await userService.logout(token);
    }
  }

  res.json({ error: null, data: { message: "Logout realizado com sucesso" } });
};

export const getMe: RequestHandler = async (req, res) => {
  if (!req.user) {
    return null;
  }
  const user = await userService.getUserByIdPublic(req.user.id);
  if (!user) {
    throw new AppError("Usuario nao encontrado", 401);
  }

  res.json({ error: null, data: user });
};
