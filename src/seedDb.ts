import config from "./config";
import mysql from 'mysql2';
import fs from 'fs';
import { join } from "path";

const root = process.cwd();

const seedQuery = fs.readFileSync(join(root, 'seed.sql'), {
    encoding: "utf-8",
});

const connection = mysql.createConnection(config.db);
connection.connect();

console.log("running sql seed...");

connection.query(seedQuery, (err: Error, results: mysql.ResultSetHeader) => {
    if (err) {
        console.error("Error executing SQL script:", err.message);
        throw err;
    }

    const resultStr = JSON.stringify(results);
    console.log("SQL seeding completed!", resultStr);
    connection.end();
});