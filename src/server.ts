import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import usersRouter from "./routes/users";
import ordersRouter from "./routes/orders";
import productsRouter from "./routes/products";
import { authMiddleware } from "./middleware/auth";

const app: express.Application = express();
const address = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/users", authMiddleware);
app.use("/users", usersRouter);
app.post("/products", authMiddleware);
app.use("/products", productsRouter);
app.use("/orders", authMiddleware, ordersRouter);

app.get("/", async (req: Request, res: Response) => {
    res.send("API up");
});

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
