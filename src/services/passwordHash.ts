import bcrypt from 'bcrypt';
import { getErrorMessage } from '../utils/errorUtils';

const saltRounds = 3;

export async function encryptPass(password: string) {
    try {
        const salt = await bcrypt
            .genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        return console.error(getErrorMessage(err));
    }
}

export async function validatePassAndHash(password: string, hash: string) {
    try {
        const res = await bcrypt
            .compare(password, hash);
        return res;
    } catch (err) {
        return console.error(getErrorMessage(err));
    }
}