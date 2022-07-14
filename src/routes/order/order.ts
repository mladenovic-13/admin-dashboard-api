import express, { Request, Response } from "express";
import { db } from "../../../firebase";
import { checkIfAdmin, checkIfAuth } from "../../auth/authMiddleware";
import { IOrder } from "../../types/data";
import { getCollection, getDocument } from "../../utils/data";

const orderRouter = express.Router();

orderRouter.use(checkIfAuth);

// GET ALL USERS
orderRouter.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await getCollection<IOrder>("orders");
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).send({ message: "Orders not found." });
  }
});

// GET USER BY UID
orderRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const order = await getDocument<IOrder>("orders", req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).send({ message: "Order not found." });
  }
});

// ADD NEW USER
orderRouter.post("/", checkIfAdmin, async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const orderSnapshot = await db.collection("orders").add(order);
    if (orderSnapshot.id) res.status(200).json(order);
    else throw new Error();
  } catch (error) {
    res.status(404).send({ message: "Order can not be created." });
  }
});

export default orderRouter;
