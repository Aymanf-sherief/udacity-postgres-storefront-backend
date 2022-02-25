import { Router, Request, Response } from "express";
import { UserStore } from "../models/users";

const usersRouter = Router();

usersRouter.get(
    "/",
    async (req: Request, res: Response): Promise<Response | void> => {
        try {
            return res.status(200).json(await UserStore.index());
        } catch (err: unknown) {
            return res.send("An error occurred: " + (err as Error).message);
        }
    }
);

usersRouter.get(
    "/:userId",
    async (req: Request, res: Response): Promise<Response | void> => {
        try {
            return res
                .status(200)
                .json(await UserStore.show(Number(req.params.userId)));
        } catch (err: unknown) {
            return res.send("An error occurred: " + (err as Error).message);
        }
    }
);

usersRouter.post(
    "/",
    async (req: Request, res: Response): Promise<Response | void> => {
        try {
            return res.status(201).json(await UserStore.create(req.body));
        } catch (err: unknown) {
            return res.send("An error occurred: " + (err as Error).message);
        }
    }
);

export default usersRouter;
