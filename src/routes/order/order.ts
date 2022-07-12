import express, { Request, Response } from "express";
import { db } from "../../../firebase";
import { checkIfAdmin, checkIfAuth } from "../../auth/authMiddleware";
import { IOrder } from "../../types/data";

const orderRouter = express.Router();

orderRouter.use(checkIfAuth);

// GET ALL USERS
orderRouter.get("/", async (req: Request, res: Response) => {
  let orders: FirebaseFirestore.DocumentData[] = [];

  try {
    const ordersSnapshot = await db.collection("orders").get();
    ordersSnapshot.forEach((order) => {
      orders.push(order.data());
    });
    if (orders) res.json(orders);
    else throw new Error();
  } catch (error) {
    res.status(404).send({ message: "Orders not found." });
  }
});

// GET USER BY UID
orderRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    let order: IOrder;
    const orderSnapshot = await db
      .collection("orders")
      .doc(req.params.id)
      .get();
    order = orderSnapshot.data() as IOrder;
    if (order) res.status(200).json(order);
    else throw new Error();
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
