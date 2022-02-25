import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type AuthRequest = Request & { user: { id: number } };
export type Token = { user: { id: number } };

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            const decoded = jwt.verify(
                token.split(" ")[1],
                process.env.TOKEN_SECRET as string
            ) as Token;

            (req as AuthRequest).user = decoded.user;

            next();
        } else {
            return res.status(401).send({ message: "No token provided" });
        }
    } catch {
        return res.status(401).send({ message: "Invalid token" });
    }
};
