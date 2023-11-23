import { Request, Response, NextFunction } from "express";

import { StatusCodes } from 'http-status-codes';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
};