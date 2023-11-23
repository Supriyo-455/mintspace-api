import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { checkEmailAndPassword } from '../services/auth';
import config from '../config';
import { getErrorMessage } from '../utils/errorUtils';
import { UserLoginRequest } from '../types/user';

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
            const response = {
                "status": "Logged in",
                "token": token,
                "refreshToken": refreshToken,
            };
            res.status(StatusCodes.OK).json(response);
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                "message": "wrong email or password!"
            });
        }
    } catch (err) {
        console.error(getErrorMessage(err));
    }
});

export default router;