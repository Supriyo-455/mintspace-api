import config from "./config";
import mysql from 'mysql2';
import fs from 'fs';

const seedQuery = fs.readFileSync("../seed.sql", {
    encoding: "utf-8",
});

const connection = mysql.createConnection(config.db);
connection.connect();

console.log("running sql seed...");

connection.query(seedQuery, (err: Error, results: mysql.RowDataPacket) => {
    if (err) {
        console.error("Error executing SQL script:", err.message);
        throw err;
    }

    console.log("SQL seeding completed!", results);
    connection.end();
});