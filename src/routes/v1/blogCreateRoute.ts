import express, { NextFunction } from 'express';
const router = express.Router();
import { Request, Response } from 'express';
import { BlogCreateRequest } from '../../types/blog';
import { createBlog } from '../../services/blog';
import { getErrorMessage } from '../../utils/errorUtils';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../../types/ApiResponse';

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const blogRequest: BlogCreateRequest = {
        "authorEmail": String(req.body.authorEmail),
        "premium": Boolean(req.body.premium),
        "title": String(req.body.title),
        "content": String(req.body.content)
    };

    try {
        const newBlog = await createBlog(blogRequest);
        const response: ApiResponse = {
            "error": false,
            "message": `blog created with id:${newBlog.insertId}`
        };
        res.status(StatusCodes.OK).json(response);
    } catch (err) {
        console.error(`error while creating blog: ${getErrorMessage(err)}`);
        next(err);
    }
});

export default router;