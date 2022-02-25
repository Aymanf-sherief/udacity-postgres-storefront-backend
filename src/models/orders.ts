import client from "../database";

export type Order = {
    id?: number;
    userId: number;
    status: string;
    products: number[];
    quantities: number[];
};

export class OrderStore {
    static async currentUserOrder(userId: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM orders INNER JOIN orders_products ON orders.id = orders_products.order_id
                 WHERE orders.user_id = $1 AND orders_products.order_id = (SELECT MAX(id) FROM orders WHERE user_id = $1)
                 ORDER BY orders.id DESC;`;
            const res = await conn.query(sql, [userId]);
            conn.release();
            const order: Order = {
                id: res.rows[0].order_id,
                userId,
                status: res.rows[0].status,
                products: res.rows.map((row) => row.product_id),
                quantities: res.rows.map((row) => row.quantity),
            };
            return order;
        } catch (err) {
            throw new Error(`cannot get current user order: ${err}`);
        }
    }
}
