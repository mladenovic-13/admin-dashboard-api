import express, { Request, Response } from "express";
import { db } from "../../../firebase";
import { checkIfAdmin, checkIfAuth } from "../../auth/authMiddleware";
import { IOrder, IProduct, IUser } from "../../types/data";
import { getCollection, getDocument } from "../../utils/data";

const productRouter = express.Router();

productRouter.use(checkIfAuth);

// GET ALL USERS
productRouter.get("/", async (req: Request, res: Response) => {
  let products: FirebaseFirestore.DocumentData[] = [];

  try {
    const products = await getCollection<IProduct>("products");
    res.status(200).json(products);
  } catch (error) {
    res.status(404).send({ message: "Products not found." });
  }
});

// GET USER BY UID
productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await getDocument<IOrder>("products", req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).send({ message: "Product not found." });
  }
});

// ADD NEW USER
productRouter.post("/", checkIfAdmin, async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const productSnapshot = await db.collection("users").add(product);
    console.log(productSnapshot);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).send({ message: "Product can not be created." });
  }
});

export default productRouter;
