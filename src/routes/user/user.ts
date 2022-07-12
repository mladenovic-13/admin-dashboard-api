import express, { Request, Response } from "express";
import { db } from "../../../firebase";
import { checkIfAdmin, checkIfAuth } from "../../auth/authMiddleware";
import { IUser } from "../../types/data";

const userRouter = express.Router();

userRouter.use(checkIfAuth);

// GET ALL USERS
userRouter.get("/", async (req: Request, res: Response) => {
  let users: FirebaseFirestore.DocumentData[] = [];

  try {
    const usersSnapshot = await db.collection("users").get();
    usersSnapshot.forEach((user) => {
      users.push(user.data());
    });
    if (users) res.json(users);
    else throw new Error();
  } catch (error) {
    res.status(404).send({ message: "Users not found." });
  }
});

// GET USER BY UID
userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    let user: IUser;
    const userSnapshot = await db.collection("users").doc(req.params.id).get();
    user = userSnapshot.data() as IUser;
    if (user) res.status(200).json(user);
    else throw new Error();
  } catch (error) {
    res.status(404).send({ message: "User not found." });
  }
});

// ADD NEW USER
userRouter.post("/", checkIfAdmin, async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const userSnapshot = await db.collection("users").add(user);
    if (userSnapshot.id) res.status(200).json(user);
    else throw new Error();
  } catch (error) {
    res.status(404).send({ message: "User can not be created." });
  }
});

export default userRouter;
