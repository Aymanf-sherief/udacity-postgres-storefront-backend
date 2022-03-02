import client from "../database";

export const setupTestDatabase = async () => {
    const conn = await client.connect();
    const sql = `INSERT INTO products(id, name, price) VALUES (0, 'test', 100);
       INSERT INTO USERS(id, name, email, password) VALUES (0, 'test', 'test@email.com', 'test');
       INSERT INTO orders(id, user_id, status) VALUES (0, 0, 'pending');
       INSERT INTO orders_products(id, order_id, product_id, quantity) VALUES (0, 0, 0, 1);`;
    await conn.query(sql);
    conn.release();
};

export const tearDownTestDatabase = async () => {
    const conn = await client.connect();
    const sql = `
    TRUNCATE products, users, orders, orders_products, migrations RESTART IDENTITY;
    DROP TABLE products CASCADE;
    DROP TABLE users CASCADE;
    DROP TABLE orders CASCADE;
    DROP TABLE orders_products CASCADE;
    DROP TABLE migrations CASCADE;
    `;
    await conn.query(sql);
    conn.release();
};
