import express, { NextFunction } from 'express';
const router = express.Router();
import { Request, Response } from 'express';
import { BlogCreateRequest } from '../types/blog';
import { createBlog } from '../services/blog';
import { getErrorMessage } from '../utils/errorUtils';

export default router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const blogRequest: BlogCreateRequest = {
        "authorEmail": String(req.body.authorEmail),
        "premium": Boolean(req.body.premium),
        "title": String(req.body.title),
        "content": String(req.body.content)
    };

    try {
        const result = await createBlog(blogRequest);
        res.send({ "message": `blog created with id: ${result.insertId}` });
    } catch (err) {
        console.error(`error while creating blog: ${getErrorMessage(err)}`);
        next(err);
    }
});