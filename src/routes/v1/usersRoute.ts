import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import { getErrorMessage } from '../../utils/errorUtils';
import { StatusCodes } from 'http-status-codes';
import { getUsersAlongWithBlog } from '../../services/blog';
import { ApiResponse } from '../../types/ApiResponse';

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Get all users with their blogs
 *     description: Returns a list of all registered users along with their respective blogs. This route is protected and requires admin privileges.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users and their blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Email:
 *                         type: string
 *                         example: johndoe@example.com
 *                       Name:
 *                         type: string
 *                         example: John Doe
 *                       IsAdmin:
 *                         type: boolean
 *                         example: false
 *                       Blogs:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             ID:
 *                               type: integer
 *                               example: 12
 *                             Title:
 *                               type: string
 *                               example: "Learning TypeScript"
 *                             IsPremium:
 *                               type: boolean
 *                               example: false
 *                             Content:
 *                               type: string
 *                               example: "TypeScript makes JavaScript development smoother..."
 *       401:
 *         description: Unauthorized — Admin access required
 *       500:
 *         description: Internal server error
 */

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getUsersAlongWithBlog();
        const response: ApiResponse = {
            "error": false,
            "result": result,
        }
        res.status(StatusCodes.OK).json(response);
    } catch (err) {
        console.error(`error while fetching blogs: ${getErrorMessage(err)}`);
        next(err);
    }
});

export default router;