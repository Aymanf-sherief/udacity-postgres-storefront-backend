import client from "../database";

export type Product = {
    id?: number;
    name: string;
    price: number;
};

export class ProductStore {
    static async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM products;";
            const res = await conn.query(sql);
            conn.release();
            return res.rows.map((prod) => ({
                ...prod,
                price: Number(prod.price),
            })) as Product[];
        } catch (err) {
            throw new Error(`cannot get products: ${err}`);
        }
    }
    static async show(id: number): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM products WHERE id = $1;";
            const res = await conn.query(sql, [id]);
            conn.release();
            const prodcut = {
                ...res.rows[0],
                price: Number(res.rows[0].price),
            };
            return prodcut;
        } catch (err) {
            throw new Error(`cannot get product with id:${id}: ${err}`);
        }
    }
    static async create({ name, price }: Product): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = "INSERT INTO products(name, price) VALUES ($1, $2);";
            await conn.query(sql, [name, price]);
            const res = await conn.query(
                "SELECT * FROM products ORDER BY id DESC LIMIT 1"
            );
            conn.release();

            const prodcut = {
                ...res.rows[0],
                price: Number(res.rows[0].price),
            };
            return prodcut;
        } catch (err) {
            throw new Error(`cannot create product: ${err}`);
        }
    }
}
