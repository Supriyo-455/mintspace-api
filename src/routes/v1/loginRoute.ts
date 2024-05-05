import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { checkEmailAndPassword } from '../../services/auth';
import config from '../../config';
import { getErrorMessage } from '../../utils/errorUtils';
import { UserLoginRequest } from '../../types/user';
import { ApiResponse } from '../../types/ApiResponse';

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const loginRequst: UserLoginRequest = {
        "email": req.body.email,
        "password": req.body.password
    };

    try {
        const validUser = await checkEmailAndPassword(loginRequst.email, loginRequst.password);
        if (validUser) {
            const token = jwt.sign(loginRequst, config.jwt.secret!, { expiresIn: config.jwt.tokenLife });  // TODO: Handle null check
            const refreshToken = jwt.sign(loginRequst, config.jwt.refreshTokenSecret!, { expiresIn: config.jwt.refreshTokenLife }); // TODO: Handle null check
            const result = {
                "status": "Logged in",
                "token": token,
                "refreshToken": refreshToken,
            };
            const response: ApiResponse = {
                error: false,
                result: result,
                message: "user logged in successfully!"
            }
            res.status(StatusCodes.OK).json(response);
        } else {
            const response: ApiResponse = {
                error: true,
                message: "wrong email or password!"
            }
            res.status(StatusCodes.UNAUTHORIZED).json(response);
        }
    } catch (err) {
        console.error(getErrorMessage(err));
        next(err);
    }
});

export default router;