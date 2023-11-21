const bcrypt = require('bcrypt');

const saltRounds = 3;

async function encryptPass(password) {
    try {
        const salt = await bcrypt
            .genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        return console.error(err.message);
    }
}

async function validatePassAndHash(password, hash) {
    try {
        const res = await bcrypt
            .compare(password, hash);
        return res;
    } catch (err) {
        return console.error(err.message);
    }
}

module.exports = {
    encryptPass,
    validatePassAndHash
};