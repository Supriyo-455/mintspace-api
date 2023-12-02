import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import { getErrorMessage } from '../../utils/errorUtils';
import { StatusCodes } from 'http-status-codes';
import { getUsersAlongWithBlog } from '../../services/user';

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getUsersAlongWithBlog();
        res.status(StatusCodes.OK).json({ "error": false, "result": result });
    } catch (err) {
        console.error(`error while fetching blogs: ${getErrorMessage(err)}`);
        next(err);
    }
});

export default router;