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
                "result": result
            }
            return res.status(StatusCodes.OK).json(response);
        } else {
            return res.status(StatusCodes.FORBIDDEN).send({ "error": true, "message": "please enter email id." });
        }
    } catch (err) {
        console.error(`error while fetching profile details: ${getErrorMessage(err)}`);
        next(err);
    }
});

export default router;