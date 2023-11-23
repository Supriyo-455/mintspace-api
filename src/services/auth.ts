import { User, UserSignInRequest } from "../types/user";
import { getUserByEmail } from "./user";
import { validatePassAndHash, encryptPass } from "./passwordHash";

export async function checkEmailAndPassword(email: string, password: string) {
    const user: User[] = await getUserByEmail(email);
    return await validatePassAndHash(password, user[0].password);
}

export async function createUser(user: UserSignInRequest) {
    // const hasedPass = await encryptPass(user.password);
    // const result = await query(`insert into user(email, name, admin, dateOfBirth, dateOfCreation, password) values
    //     ('${user.email}', '${user.name}', ${user.admin}, '${user.dateOfBirth}', '${user.dateOfCreation}', '${hasedPass}')`);
    // return result;
    return { "message": "ok" };
}