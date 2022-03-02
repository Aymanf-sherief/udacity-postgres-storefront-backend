import client from "../../database";
import { OrderStore } from "../../models/orders";

describe("Order Model", () => {
    it("should have an currentUserOrder method", () => {
        expect(OrderStore.currentUserOrder).toBeDefined();
    });

    it("currentUserOrder method should return the current user order", async () => {
        const order = await OrderStore.currentUserOrder(0);
        expect(order).toEqual({
            id: 0,
            user_id: 0,
            status: "pending",
            products: [0],
            quantities: [1],
        });
    });

    it("should have an create method", () => {
        expect(OrderStore.create).toBeDefined();
    });

    it("create method should create an order", async () => {
        const order = await OrderStore.create(0, "pending2");
        expect(order).toEqual({
            id: 1,
            user_id: 0,
            status: "pending2",
        });
        const conn = await client.connect();
        const sql = "DELETE FROM orders WHERE id = 1;";
        await conn.query(sql);
        conn.release();
    });
});
