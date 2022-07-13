import admin from "../../firebase";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  // extract user data from request body
  const userData = req.body;

  const user = await admin.auth().createUser(userData);

  return res.send(user);
};
