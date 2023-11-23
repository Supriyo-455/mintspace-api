import { User } from "../types/user";
import { connection } from "./db";

export function getUserByEmail(email: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
        connection.query<User[]>(`select * from user where email = '${email}'`, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}