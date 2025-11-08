import express, { NextFunction } from 'express';
const router = express.Router();
import { Request, Response } from 'express';
import { getErrorMessage } from '../../utils/errorUtils';
import { getUserByEmail } from '../../services/user';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../../types/ApiResponse';

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Get user profile details
 *     description: Fetches profile details of a user by their email. Requires authentication.
 *     tags:
 *       - Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *                 description: The email ID of the user whose profile is to be fetched
 *     responses:
 *       200:
 *         description: Profile details fetched successfully
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
 *                     Email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     Name:
 *                       type: string
 *                       example: John Doe
 *                     IsAdmin:
 *                       type: boolean
 *                       example: false
 *                     DateOfBirth:
 *                       type: string
 *                       format: date
 *                       example: 1999-05-14
 *                     ProfileCreatedDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-12T09:23:45.000Z
 *                 message:
 *                   type: string
 *                   example: "profile details fetched successfully!"
 *       403:
 *         description: Missing or invalid email in request body
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
 *                   example: "please enter email id."
 *       500:
 *         description: Internal server error
 */

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        if (email) {
            const result = await getUserByEmail(email);
            const response: ApiResponse = {
                "error": false,
                "result": result,
                "message": "profile details fetched successfully!"
            }
            return res.status(StatusCodes.OK).json(response);
        } else {
            const response: ApiResponse = { "error": true, "message": "please enter email id." }
            return res.status(StatusCodes.FORBIDDEN).send(response);
        }
    } catch (err) {
        console.error(`error while fetching profile details: ${getErrorMessage(err)}`);
        next(err);
    }
});

export default router;