import express from 'express';
const router = express.Router();
import { createUser } from '../services/auth';
import { getErrorMessage } from '../utils/errorUtils';
import { UserSignInRequest } from '../types/user';

router.post('/', async (req, res, next) => {
    const user: UserSignInRequest = {
        "email": req.body.email,
        "name": req.body.name,
        "password": req.body.password,
        "dateOfBirth": req.body.dateOfBirth,
        "dateCreated": req.body.dateOfCreation,
        "admin": req.body.admin
    };

    try {
        res.json(await createUser(user));
    } catch (err) {
        console.error("error while creating user ", getErrorMessage(err));
        next(err);  // TODO: change error message
    }
});


export default router;