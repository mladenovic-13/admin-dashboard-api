import express, { Request, Response } from "express";
import { checkIfAuth } from "../../auth/authMiddleware";
import { getChartData } from "../../utils/charts";

const chartRouter = express.Router();

chartRouter.use(checkIfAuth);

chartRouter.get("/six-months", async (req: Request, res: Response) => {
  try {
    const data = await getChartData();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).send("Failed to load chart data.");
  }
});

export default chartRouter;
