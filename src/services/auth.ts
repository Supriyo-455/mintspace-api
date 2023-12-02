import { User, UserSignInRequest } from "../types/user";
import { getUserByEmail, createNewUser } from "./user";
import { validatePassAndHash, encryptPass } from "./passwordHash";

export async function checkEmailAndPassword(email: string, password: string) {
    const user: User[] = await getUserByEmail(email);
    if (user.length < 1) {
        return false;
    }
    return await validatePassAndHash(password, user[0].password);
}

export async function signupNewUser(user: UserSignInRequest) {
    const hasedPass = await encryptPass(user.password);
    if (hasedPass) {
        user.password = hasedPass;
        const result = await createNewUser(user);
        return result.insertId;
    } else {
        throw new Error("can't create user");
    }
}