import express, { Request, Response } from "express";
import { checkIfAdmin, checkIfAuth } from "../../auth/authMiddleware";
import { IUser } from "../../types/data";
import { addDocument, getCollection, getDocument } from "../../utils/data";

const userRouter = express.Router();

userRouter.use(checkIfAuth);

// GET ALL USERS
userRouter.get("/", async (req: Request, res: Response) => {
  let users: FirebaseFirestore.DocumentData[] = [];

  try {
    const users = await getCollection<IUser>("users");
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send({ message: "Users not found." });
  }
});

// GET USER BY UID
userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await getDocument<IUser>(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send({ message: "User not found." });
  }
});

// ADD NEW USER
userRouter.post("/", checkIfAdmin, async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const newUser = await addDocument<IUser>("users", user);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).send({ message: "User can not be created." });
  }
});

export default userRouter;
