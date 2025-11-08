import express, { NextFunction } from 'express';
const router = express.Router();
import { Request, Response } from 'express';
import { signupNewUser } from '../../services/auth';
import { getErrorMessage } from '../../utils/errorUtils';
import { UserSignInRequest } from '../../types/user';
import { ApiResponse } from '../../types/ApiResponse';

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with name, email, password, and other optional details.
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
 *               - name
 *               - password
 *               - dateOfBirth
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *                 description: User's unique email address
 *               name:
 *                 type: string
 *                 example: John Doe
 *                 description: Full name of the user
 *               password:
 *                 type: string
 *                 example: password123
 *                 description: Password for the account
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: 1999-05-14
 *                 description: Date of birth of the user
 *               dateOfCreation:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-11-08T10:45:00.000Z
 *                 description: "Timestamp of account creation (optional)"
 *               admin:
 *                 type: boolean
 *                 example: false
 *                 description: "Flag to set user as admin (default: false)"
 *     responses:
 *       200:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "created new user with email:johndoe@example.com"
 *       400:
 *         description: Invalid or missing fields in request
 *       500:
 *         description: Internal server error
 */

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