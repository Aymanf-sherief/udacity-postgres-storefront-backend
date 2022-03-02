import client from "../database";

export type Order = {
    id?: number;
    user_id: number;
    status: string;
    products?: number[];
    quantities?: number[];
};

export class OrderStore {
    static async currentUserOrder(userId: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = `SELECT * FROM orders FULL OUTER JOIN orders_products ON orders.id = orders_products.order_id
                 WHERE orders.user_id = $1 AND orders_products.order_id = (SELECT MAX(id) FROM orders WHERE user_id = $1)
                 ORDER BY orders.id DESC;`;
            const res = await conn.query(sql, [userId]);

            conn.release();
            const order: Order = {
                id: res.rows[0].order_id,
                user_id: userId,
                status: res.rows[0].status,
                products: res.rows.map((row) => row.product_id),
                quantities: res.rows.map((row) => row.quantity),
            };
            return order;
        } catch (err) {
            throw new Error(`cannot get current user order: ${err}`);
        }
    }
    static async create(userId: number, status: string): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = "INSERT INTO orders(user_id, status) VALUES ($1, $2);";
            await conn.query(sql, [userId, status]);
            const res = await conn.query(
                "SELECT * FROM orders ORDER BY id DESC LIMIT 1"
            );
            conn.release();
            return res.rows[0];
        } catch (err) {
            throw new Error(`cannot create product: ${err}`);
        }
    }
}
