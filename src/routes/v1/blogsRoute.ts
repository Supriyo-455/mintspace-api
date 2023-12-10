import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import { getBlogs, getBlogById } from '../../services/blog';
import { getErrorMessage } from '../../utils/errorUtils';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../../types/ApiResponse';


router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page);
        const result = await getBlogs(page);
        const response: ApiResponse = {
            "error": false,
            "result": result,
            "page": page
        }
        res.status(StatusCodes.OK).json(response);
    } catch (err) {
        console.error(`error while fetching blogs: ${getErrorMessage(err)}`);
        next(err);
    }
});

router.get('/:id(\\d+)', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getBlogById(Number(req.params.id));
        const response: ApiResponse = {
            "error": false,
            "result": result
        }
        res.status(StatusCodes.OK).json(response);
    } catch (err) {
        console.error(`error: ${getErrorMessage(err)}, while fetching blog having id: ${req.params.id}`);
        next(err);
    }
});

export default router;