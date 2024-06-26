import express, { NextFunction } from 'express';
const router = express.Router();
import { Request, Response } from 'express';
import { signupNewUser } from '../../services/auth';
import { getErrorMessage } from '../../utils/errorUtils';
import { UserSignInRequest } from '../../types/user';
import { ApiResponse } from '../../types/ApiResponse';

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const user: UserSignInRequest = {
        "email": req.body.email,
        "name": req.body.name,
        "password": req.body.password,
        "dateOfBirth": req.body.dateOfBirth,
        "dateOfCreation": req.body.dateOfCreation,
        "admin": req.body.admin
    };

    try {
        const newId = await signupNewUser(user);
        const response: ApiResponse = {
            "error": false,
            "message": `created new user with email:${user.email}`
        }
        res.status(200).json(response);
    } catch (err) {
        console.error("error while creating user ", getErrorMessage(err));
        next(err);  // TODO: change error message
    }
});


export default router;