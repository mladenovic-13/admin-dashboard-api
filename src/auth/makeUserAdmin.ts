import { Request, Response } from "express";
import { auth } from "firebase-admin";

export const makeUserAdmin = async (req: Request, res: Response) => {
  const { userId } = req.body; // firebase uid for user

  await auth().setCustomUserClaims(userId, { admin: true });

  return res.send({ message: "Success" });
};
