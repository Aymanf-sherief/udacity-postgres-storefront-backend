import jwt from "jsonwebtoken";
import supertest from "supertest";
import app from "../../server";
import client from "../../database";

const request = supertest(app);

describe("Test users router", () => {
    it("should be able to get all users", async () => {
        const token = jwt.sign(
            { user: { id: 0 } },
            process.env.TOKEN_SECRET as string
        );
        const response = await request
            .get("/users")
            .set("Authorization", "Bearer " + token);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                id: 0,
                name: "test",
                email: "test@email.com",
            },
        ]);
    });

    it("should be able to get a specific user", async () => {
        const token = jwt.sign(
            { user: { id: 0 } },
            process.env.TOKEN_SECRET as string
        );
        const response = await request
            .get("/users/0")
            .set("Authorization", "Bearer " + token);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: 0,
            name: "test",
            email: "test@email.com",
        });
    });

    it("should be able to create a user", async () => {
        const token = jwt.sign(
            { user: { id: 2 } },
            process.env.TOKEN_SECRET as string
        );

        const response = await request.post("/users").send({
            name: "test2",
            email: "test2@email.com",
            password: "password",
        });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: 2,
            name: "test2",
            email: "test2@email.com",
            token,
        });
        const conn = await client.connect();
        const sql = "DELETE FROM users WHERE id = 1;";
        await conn.query(sql);
        conn.release();
    });
});
