import { Request, Response, NextFunction } from "express";

const apiVersionHandler = (req: Request, res: Response, next: NextFunction) => {
    const version = req.url.split('/')[1];
    res.header('apiVersion', version);
    next();
};

export default apiVersionHandler;