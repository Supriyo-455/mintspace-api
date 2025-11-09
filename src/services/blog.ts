import { connection } from "./db";
import { getOffset } from "./helper";
import config from "../config";
import { ResultSetHeader } from "mysql2";
import { Like } from "../types/like";
import { UserAndBlog } from "../types/user";
import { Comment } from "../types/comment";
import { Blog, BlogCreateRequest, BlogTag, LikesAndCommentsCount } from "../types/blog";

export function getBlogs(page: number = 1): Promise<Blog[]> {
	const offset = getOffset(page, config.listPerPage);
	return new Promise((resolve, reject) => {
		connection.query<Blog[]>(`SELECT * from blogs limit ${offset}, ${config.listPerPage}`, (err, res) => {
			if (err) reject(err);
			else resolve(res)
		});
	});
}

export function getBlogById(id: number): Promise<Blog[]> {
	return new Promise((resolve, reject) => {
		connection.query<Blog[]>(`select * from blogs where id='${id}'`, (err, res) => {
			if (err) reject(err);
			else resolve(res)
		});
	});
}

export function getUsersAlongWithBlog(): Promise<UserAndBlog[]> {
    return new Promise((resolve, reject) => {
        connection.query<UserAndBlog[]>(
            `select u.email, u.name, u.dateOfBirth, b.id as blogId, b.premium, b.title
            from users u 
            join blogs b on u.email=b.authorEmail`,
            (err, res) => {
                if (err) reject(err);
                else resolve(res);
        });
    });
}

export function createBlog(blog: BlogCreateRequest): Promise<ResultSetHeader> {
	return new Promise((resolve, reject) => {
		connection.query<ResultSetHeader>(`insert into blogs(authorEmail, premium, title, content)
			values ('${blog.authorEmail}', ${blog.premium}, '${blog.title}', '${blog.content}')`,
			(err, res) => {
				if (err) reject(err);
				else resolve(res);
		});
	});
}

export function addTagToBlog(blogTag: BlogTag): Promise<ResultSetHeader> {
	return new Promise((resolve, reject) => {
		connection.query<ResultSetHeader>(`insert into blogTags(blogId, tag)
			values (${blogTag.blogId}, '${blogTag.tag}')`,
			(err, res) => {
				if (err) reject(err);
				else resolve(res);
		});
	});
}

export function addLikeToBlog(like: Like): Promise<ResultSetHeader> {
	return new Promise((resolve, reject) => {
		connection.query<ResultSetHeader>(`insert into likes(blogId, userEmail, ipAddress)
			values (${like.blogId}, '${like.userEmail}', '${like.ipAddress}')`,
			(err, res) => {
				if (err) reject(err);
				else resolve(res);
			});
	});
}

export function getLikesAndCommentsCountFromBlog(blogId: number): Promise<LikesAndCommentsCount[]> {
	return new Promise((resolve, reject) => {
		connection.query<LikesAndCommentsCount[]>(`select
			(select count(*) from likes where blogId = ${blogId}) as totalLikes,
			(select count(*) from comments where blogId = ${blogId}) as totalComments`,
			(err, res) => {
				if (err) reject(err);
				else resolve(res);
			});
	});
}

export function getBlogTags(blogId: number): Promise<BlogTag[]> {
	return new Promise((resolve, reject) => {
        connection.query<BlogTag[]>(
            `select tag from blogtags where blogId = ${blogId}`,
            (err, res) => {
                if (err) reject(err);
                else resolve(res);  
		});
    });
}

export function getCommentsFromBlogPaginated(blogId: number, page: number = 1): Promise<Comment[]> {
	const offset = getOffset(page, config.listPerPage);
	return new Promise((resolve, reject) => {
		connection.query<Comment[]>(`
			select *
			from comments c
			where c.blogId = ${blogId}
			limit ${offset}, ${config.listPerPage}
			)`,
			(err, res) => {
				if (err) reject(err);
				else resolve(res);
		});
	});
}