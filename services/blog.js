const db = require("./db");
const helper = require("./helper");
const config = require("../config");

async function getBlogs(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * from blog limit ${offset}, ${config.listPerPage}`);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    page
  };
}

async function getBlogById(id) {
  const rows = await db.query(`select * from blog where id='${id}'`);
  const data = helper.emptyOrRows(rows);

  return {
    data
  };
}

module.exports = {
  getBlogs,
  getBlogById
};