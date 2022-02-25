import client from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type User = {
    id?: number;
    name: string;
    email: string;
    password?: string;
    token?: string;
};

export class UserStore {
    static async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = "SELECT * FROM users;";
            const res = await conn.query(sql);
            conn.release();
            res.rows.forEach((user) => {
                delete user.password;
            });

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
            const { name, email } = res.rows[0];
            return { id, name, email };
        } catch (err) {
            throw new Error(`cannot get user with id:${id}: ${err}`);
        }
    }
    static async create({ name, email, password }: User): Promise<User> {
        try {
            const conn = await client.connect();
            const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
            const hashedPassword = bcrypt.hashSync(
                (password as string) + process?.env?.PEPPER,
                salt
            );
            const sql =
                "INSERT INTO users(name, email, password) VALUES ($1, $2, $3);";
            await conn.query(sql, [name, email, hashedPassword]);
            const res = await conn.query(
                "SELECT * FROM users ORDER BY id DESC LIMIT 1"
            );
            conn.release();
            const { id, name: userName, email: userEmail } = res.rows[0];
            const token = jwt.sign(
                { user: { id } },
                process.env.TOKEN_SECRET as string
            );

            return { id, name: userName, email: userEmail, token };
        } catch (err) {
            throw new Error(`cannot create user: ${err}`);
        }
    }
}
