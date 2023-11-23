import { connection } from "./db";
import { getOffset } from "./helper";
import config from "../config";
import { Blog } from "../types/blog";

export function getBlogs(page = 1): Promise<Blog[]> {
	const offset = getOffset(page, config.listPerPage);
	return new Promise((resolve, reject) => {
		connection.query<Blog[]>(`SELECT * from blog limit ${offset}, ${config.listPerPage}`, (err, res) => {
			if (err) reject(err);
			else resolve(res)
		})
	});
}

export function getBlogById(id: number): Promise<Blog[]> {
	return new Promise((resolve, reject) => {
		connection.query<Blog[]>(`select * from blog where id='${id}'`, (err, res) => {
			if (err) reject(err);
			else resolve(res)
		})
	});
}