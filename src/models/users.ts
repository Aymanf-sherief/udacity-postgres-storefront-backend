import client from "../database";
import bcrypt from "bcrypt";

export type User = {
    id?: number;
    name: string;
    email: string;
    password: string;
};

export class UserStore {
    static async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM users;";
            const res = await conn.query(sql);
            conn.release();
            return res.rows as User[];
        } catch (err) {
            throw new Error(`cannot get users: ${err}`);
        }
    }
    static async show(id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM users WHERE id = $1;";
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0] as User;
        } catch (err) {
            throw new Error(`cannot get user with id:${id}: ${err}`);
        }
    }
    static async create({ name, email, password }: User): Promise<void> {
        try {
            const conn = await client.connect();
            const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
            const hashedPassword = bcrypt.hashSync(
                password + process.env.PEPPER,
                salt
            );
            const sql =
                "INSERT INTO users(name, email, password) VALUES ($1, $2, $3);";
            await conn.query(sql, [name, email, hashedPassword]);
            conn.release();
        } catch (err) {
            throw new Error(`cannot create user: ${err}`);
        }
    }
}
