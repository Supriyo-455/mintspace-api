const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "1124",
    database: "goblogapi",
    port: 3306,
    multipleStatements: true,
    connectTimeout: 60000,
  },
  listPerPage: 10,
};
module.exports = config;
