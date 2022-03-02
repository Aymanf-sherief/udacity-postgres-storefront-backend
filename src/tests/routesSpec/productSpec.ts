import jwt from "jsonwebtoken";
import supertest from "supertest";
import app from "../../server";
import client from "../../database";

const request = supertest(app);

describe("Test products router", () => {
    it("should be able to get all products", async () => {
        const response = await request.get("/products");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: 0,
                name: "test",
                price: 100,
            },
        ]);
    });

    it("should be able to get a specific product", async () => {
        const response = await request.get("/products/0");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 0,
            name: "test",
            price: 100,
        });
    });

    it("should be able to create a product", async () => {
        const token = jwt.sign(
            { user: { id: 0 } },
            process.env.TOKEN_SECRET as string
        );
        const response = await request
            .post("/products")
            .set("Authorization", "Bearer " + token)
            .send({
                name: "test2",
                price: 200,
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: 2,
            name: "test2",
            price: 200,
        });
        const conn = await client.connect();
        const sql = "DELETE FROM products WHERE id = 1;";
        await conn.query(sql);
        conn.release();
    });
});
