const db = require("./db");
const passwordHash = require("./passwordHash");

async function checkEmailAndPassword(email, password) {
    const rows = await db.query(`select * from user where email="${email}"`);
    if (!rows) {
        return false;
    }
    return await passwordHash.validatePassAndHash(password, rows[0].password);
}

async function createUser(user) {
    const hasedPass = await passwordHash.encryptPass(user.password);
    result = await db.query(`insert into user(email, name, admin, dateOfBirth, dateOfCreation, password) values
        ('${user.email}', '${user.name}', ${user.admin}, '${user.dateOfBirth}', '${user.dateOfCreation}', '${hasedPass}')`);
    return result;
}

module.exports = {
    checkEmailAndPassword,
    createUser
};