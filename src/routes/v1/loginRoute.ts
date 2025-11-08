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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user using email and password. Returns an access token and refresh token if credentials are valid.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *                 description: User's registered email address
 *               password:
 *                 type: string
 *                 example: password123
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 result:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "Logged in"
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 message:
 *                   type: string
 *                   example: "user logged in successfully!"
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "wrong email or password!"
 *       500:
 *         description: Internal server error
 */

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