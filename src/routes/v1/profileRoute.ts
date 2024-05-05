import express, { NextFunction } from 'express';
const router = express.Router();
import { Request, Response } from 'express';
import { getErrorMessage } from '../../utils/errorUtils';
import { getUserByEmail } from '../../services/user';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../../types/ApiResponse';

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        if (email) {
            const result = await getUserByEmail(email);
            const response: ApiResponse = {
                "error": false,
                "result": result,
                "message": "profile details fetched successfully!"
            }
            return res.status(StatusCodes.OK).json(response);
        } else {
            const response: ApiResponse = { "error": true, "message": "please enter email id." }
            return res.status(StatusCodes.FORBIDDEN).send(response);
        }
    } catch (err) {
        console.error(`error while fetching profile details: ${getErrorMessage(err)}`);
        next(err);
    }
});

export default router;