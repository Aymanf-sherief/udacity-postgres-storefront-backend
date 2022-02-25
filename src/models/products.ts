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
            return res.rows as Product[];
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
            return res.rows[0] as Product;
        } catch (err) {
            throw new Error(`cannot get product with id:${id}: ${err}`);
        }
    }
    static async create({ name, price }: Product): Promise<void> {
        try {
            const conn = await client.connect();
            const sql = "INSERT INTO products(name, price) VALUES ($1, $2);";
            await conn.query(sql, [name, price]);
            conn.release();
        } catch (err) {
            throw new Error(`cannot create product: ${err}`);
        }
    }
}
