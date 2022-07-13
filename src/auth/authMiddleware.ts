// Auth middleware to ensure there is a
// valid firebase token in the request header

import { NextFunction, Request, Response } from "express";
import admin from "../../firebase";

// Get token from request headers if exists
const getAuthToken = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }

  next();
};

// normal user
export const checkIfAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken as string);
      req.authId = userInfo.uid;
      return next();
    } catch (error) {
      return res
        .status(401)
        .send("You are not authorized to make this request!");
    }
  });
};

// admin
export const checkIfAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken as string);
      if (userInfo.admin === true) {
        req.authId = userInfo.uid;
        return next();
      }

      throw new Error("Unauthorized");
    } catch (error) {
      return res.status(401).send("You are not admin to make this request!");
    }
  });
};
