import express, { Request, Response } from "express";
import { checkIfAuth } from "../../auth/authMiddleware";
import { WIDGET } from "../../types/widghet";
import { getWidget } from "../../utils/data";
const widgetRouter = express.Router();

widgetRouter.use(checkIfAuth);

widgetRouter.get("/:type", async (req: Request, res: Response) => {
  try {
    const widget = await getWidget(req.params.type);
    res.status(200).json(widget);
  } catch (error) {
    res.status(404).send("Something went wrong!");
  }
});

export default widgetRouter;
