import bcrypt from 'bcrypt';
import { getErrorMessage } from '../utils/errorUtils';

export async function encryptPass(password: string) {
    const saltRounds = 3;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        return console.error(getErrorMessage(err));
    }
}

export async function validatePassAndHash(password: string, hash: string) {
    try {
        const res = await bcrypt.compare(password, hash);
        return res;
    } catch (err) {
        return console.error(getErrorMessage(err));
    }
}