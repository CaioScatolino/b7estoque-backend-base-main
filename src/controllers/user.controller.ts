import { RequestHandler } from "express";
import { createUserSchema } from "../validators/user.validator";

export const createUser: RequestHandler = async (req, res) => {
  const data = createUserSchema.parse(req.body);
  //TO DO: criar o usuário

  res.status(201).json({ error: null, data: user });
};
