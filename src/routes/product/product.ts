import express, { Request, Response } from "express";
import { db } from "../../../firebase";
import { checkIfAdmin, checkIfAuth } from "../../auth/authMiddleware";
import { IProduct, IUser } from "../../types/data";

const productRouter = express.Router();

productRouter.use(checkIfAuth);

// GET ALL USERS
productRouter.get("/", async (req: Request, res: Response) => {
  let products: FirebaseFirestore.DocumentData[] = [];

  try {
    const productsSnapshot = await db.collection("products").get();
    productsSnapshot.forEach((product) => {
      products.push(product.data());
    });
    res.json();
  } catch (error) {
    res.status(404).send({ message: "Products not found." });
  }
});

// GET USER BY UID
productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    let product: IProduct;
    const productSnapshot = await db
      .collection("products")
      .doc(req.params.id)
      .get();
    product = productSnapshot.data() as IProduct;
    if (product) res.status(200).json(product);
    else throw new Error();
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
