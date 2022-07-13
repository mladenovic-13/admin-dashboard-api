import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import userRouter from "./routes/user/user";
import productRouter from "./routes/product/product";
import orderRouter from "./routes/order/order";

dotenv.config();

const app: Express = express();
const port = 8000;

app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.json());

// promote basic user to admin
app.post("/make-admin", async (req: Request, res: Response) => {
  const { userId } = req.body; // firebase uid for user
});
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
