import express, { NextFunction } from 'express';
const router = express.Router();
import { Request, Response } from 'express';
import { BlogCreateRequest } from '../../types/blog';
import { createBlog } from '../../services/blog';
import { getErrorMessage } from '../../utils/errorUtils';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../../types/ApiResponse';

/**
 * @swagger
 * /write:
 *   post:
 *     summary: Create a new blog post
 *     description: Allows an authenticated user to create a new blog. This route is protected and requires valid authentication.
 *     tags:
 *       - Blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorEmail
 *               - premium
 *               - title
 *               - content
 *             properties:
 *               authorEmail:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *                 description: Email address of the blog author
 *               premium:
 *                 type: boolean
 *                 example: false
 *                 description: Indicates if the blog is premium content
 *               title:
 *                 type: string
 *                 example: "The Beauty of TypeScript"
 *                 description: Title of the blog post
 *               content:
 *                 type: string
 *                 example: "TypeScript adds type safety to JavaScript..."
 *                 description: Full content of the blog post in Markdown
 *     responses:
 *       200:
 *         description: Blog successfully created
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
 *                   example: "blog created with id:42"
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       401:
 *         description: Unauthorized (authentication required)
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const blogRequest: BlogCreateRequest = {
        "authorEmail": String(req.body.authorEmail),
        "premium": Boolean(req.body.premium),
        "title": String(req.body.title),
        "content": String(req.body.content)
    };

    try {
        const newBlog = await createBlog(blogRequest);
        const response: ApiResponse = {
            "error": false,
            "message": `blog created with id:${newBlog.insertId}`
        };
        res.status(StatusCodes.OK).json(response);
    } catch (err) {
        console.error(`error while creating blog: ${getErrorMessage(err)}`);
        next(err);
    }
});

export default router;