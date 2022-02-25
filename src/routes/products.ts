import { Router, Request, Response } from "express";
import { ProductStore } from "../models/products";

const productsRouter = Router();

productsRouter.get(
    "/",
    async (req: Request, res: Response): Promise<Response | void> => {
        try {
            return res.status(200).json(await ProductStore.index());
        } catch (err: unknown) {
            return res.send("An error occurred: " + (err as Error).message);
        }
    }
);

productsRouter.get(
    "/:productId",
    async (req: Request, res: Response): Promise<Response | void> => {
        try {
            return res
                .status(200)
                .json(await ProductStore.show(Number(req.params.productId)));
        } catch (err: unknown) {
            return res.send("An error occurred: " + (err as Error).message);
        }
    }
);

productsRouter.post(
    "/",
    async (req: Request, res: Response): Promise<Response | void> => {
        try {
            return res.status(201).json(await ProductStore.create(req.body));
        } catch (err: unknown) {
            return res.send("An error occurred: " + (err as Error).message);
        }
    }
);

export default productsRouter;
