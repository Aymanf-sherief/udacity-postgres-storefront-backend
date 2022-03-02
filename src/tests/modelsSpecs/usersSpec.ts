import client from "../../database";
import { UserStore } from "../../models/users";
import jwt from "jsonwebtoken";

describe("User Model", () => {
    it("should have an index method", () => {
        expect(UserStore.index).toBeDefined();
    });

    it("index method should return user list", async () => {
        const users = await UserStore.index();
        expect(users).toEqual([
            {
                id: 0,
                name: "test",
                email: "test@email.com",
            },
        ]);
    });

    it("should have a show method", () => {
        expect(UserStore.show).toBeDefined();
    });

    it("show method should get a user", async () => {
        const user = await UserStore.show(0);
        expect(user).toEqual({
            id: 0,
            name: "test",
            email: "test@email.com",
        });
    });

    it("should have a create method", () => {
        expect(UserStore.create).toBeDefined();
    });

    it("create method should create a user", async () => {
        const userToCreate = {
            name: "test2",
            email: "test2@email.com",
            password: "test2",
        };
        const token = jwt.sign(
            { user: { id: 1 } },
            process.env.TOKEN_SECRET as string
        );
        const user = await UserStore.create(userToCreate);
        expect(user).toEqual({
            id: 1,
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
