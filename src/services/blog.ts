import { connection } from "./db";
import { getOffset } from "./helper";
import config from "../config";
import { Blog, BlogCreateRequest } from "../types/blog";
import { ResultSetHeader } from "mysql2";

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

export function createBlog(blog: BlogCreateRequest): Promise<ResultSetHeader> {
	return new Promise((resolve, reject) => {
		connection.query<ResultSetHeader>(`insert into blog(authorEmail, premium, title, content)
		values ('${blog.authorEmail}', ${blog.premium}, '${blog.title}', '${blog.content}')`,
			(err, res) => {
				if (err) reject(err);
				else resolve(res);
			});
	});
}