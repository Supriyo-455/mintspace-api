import { ResultSetHeader } from "mysql2";
import { User, UserSignInRequest, UserAndBlog } from "../types/user";
import { connection } from "./db";

export function getUserByEmail(email: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
        connection.query<User[]>(`select * from users where email = '${email}'`, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}

export function createNewUser(data: UserSignInRequest): Promise<ResultSetHeader> {
    return new Promise((resolve, reject) => {
        connection.query<ResultSetHeader>(`insert into users(email, name, admin, dateOfBirth, dateOfCreation, password) values
        ('${data.email}', '${data.name}', ${data.admin}, '${data.dateOfBirth}', '${data.dateOfCreation}', '${data.password}')`, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}