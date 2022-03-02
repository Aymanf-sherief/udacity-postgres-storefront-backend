import jwt from "jsonwebtoken";
import supertest from "supertest";
import app from "../../server";
import client from "../../database";

const request = supertest(app);

describe("Test orders router", () => {
    it("should be able to get current user order", async () => {
        const token = jwt.sign(
            { user: { id: 0 } },
            process.env.TOKEN_SECRET as string
        );
        const response = await request
            .get("/orders/current-user-order")
            .set("Authorization", "Bearer " + token);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 0,
            user_id: 0,
            status: "pending",
            products: [0],
            quantities: [1],
        });
    });

    it("should be able to create an order", async () => {
        const token = jwt.sign(
            { user: { id: 0 } },
            process.env.TOKEN_SECRET as string
        );
        const response = await request
            .post("/orders")
            .set("Authorization", "Bearer " + token)
            .send({ status: "pending2" });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: 2,
            user_id: 0,
            status: "pending2",
        });
        const conn = await client.connect();
        const sql = "DELETE FROM orders WHERE id = 1;";
        await conn.query(sql);
        conn.release();
    });
});
