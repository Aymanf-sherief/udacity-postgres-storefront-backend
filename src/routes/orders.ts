import { Router, Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { OrderStore } from "../models/orders";

const ordersRouter = Router();

ordersRouter.get(
    "/current-user-order",
    async (req: Request, res: Response): Promise<Response | void> => {
        try {
            return res
                .status(200)
                .json(
                    await OrderStore.currentUserOrder(
                        (req as AuthRequest).user.id
                    )
                );
        } catch (err: unknown) {
            return res.send("An error occurred: " + (err as Error).message);
        }
    }
);

ordersRouter.post(
    "/",
    async (req: Request, res: Response): Promise<Response | void> => {
        try {
            return res
                .status(201)
                .json(
                    await OrderStore.create(
                        (req as AuthRequest).user.id,
                        req.body.status
                    )
                );
        } catch (err: unknown) {
            return res.send("An error occurred: " + (err as Error).message);
        }
    }
);

export default ordersRouter;
