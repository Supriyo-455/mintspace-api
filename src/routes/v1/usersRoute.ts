import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import { getErrorMessage } from '../../utils/errorUtils';
import { StatusCodes } from 'http-status-codes';
import { getUsersAlongWithBlog } from '../../services/user';
import { ApiResponse } from '../../types/ApiResponse';

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getUsersAlongWithBlog();
        const response: ApiResponse = {
            "error": false,
            "result": result,
        }
        res.status(StatusCodes.OK).json(response);
    } catch (err) {
        console.error(`error while fetching blogs: ${getErrorMessage(err)}`);
        next(err);
    }
});

export default router;