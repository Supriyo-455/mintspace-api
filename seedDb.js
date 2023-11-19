const config = require("./config");
const mysql = require('mysql2');
const fs = require('fs');

const seedQuery = fs.readFileSync("seed.sql", {
    encoding: "utf-8",
});

const connection = mysql.createConnection(config.db);
connection.connect();

console.log("running sql seed...");

connection.query(seedQuery, (err, results) => {
    if (err) {
        console.error("Error executing SQL script:", err.message);
        throw err;
    }

    console.log("SQL seeding completed!", results);
    connection.end();
});