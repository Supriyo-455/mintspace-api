import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import config from '../config';

export default (req: Request<{ token: string }>, res: Response, next: NextFunction) => {
    const token = req.header('x-access-token');
    if (token) {
        try {
            const decoded = jwt.verify(token, config.jwt.secret!);
            res.locals.jwtPayload = decoded;
            next();
        } catch (err) {
            res.status(StatusCodes.UNAUTHORIZED).send({
                "error": true,
                "message": 'Unauthorized access!.'
            });
        }
    } else {
        return res.status(StatusCodes.FORBIDDEN).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
};