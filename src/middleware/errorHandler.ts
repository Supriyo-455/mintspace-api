import { Request, Response, NextFunction } from "express";

import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from "../types/ApiResponse";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    console.error(err.message, err.stack);
    const response: ApiResponse = { "error": true, "message": err.message };
    res.status(statusCode).json(JSON.stringify(response));
    return;
};