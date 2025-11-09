import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import { getBlogs, getBlogById, getLikesAndCommentsCountFromBlog, getBlogTags, addLikeToBlog, getCommentsFromBlogPaginated } from '../../services/blog';
import { getErrorMessage } from '../../utils/errorUtils';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../../types/ApiResponse';
import { BlogWithStatsAndTags } from '../../types/blog';
import { LikeReq } from '../../types/like';

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get paginated list of blogs
 *     description: Returns a list of blogs for the given page number. Public users see only regular blogs. Authenticated users can view both regular and premium blogs.
 *     tags:
 *       - Home
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: false
 *         description: Page number for pagination (default = 1)
 *     responses:
 *       200:
 *         description: Successfully retrieved blogs
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
 *                       ID:
 *                         type: integer
 *                         example: 12
 *                       AuthorEmail:
 *                         type: string
 *                         example: johndoe@example.com
 *                       IsPremium:
 *                         type: boolean
 *                         example: false
 *                       Title:
 *                         type: string
 *                         example: "Understanding TypeScript"
 *                       Content:
 *                         type: string
 *                         example: "TypeScript is a typed superset of JavaScript..."
 *                 page:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get blog by ID
 *     description: Fetch a specific blog post using its numeric ID.
 *     tags:
 *       - Home
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *         description: The unique ID of the blog
 *     responses:
 *       200:
 *         description: Successfully fetched blog
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
 *                     ID:
 *                       type: integer
 *                       example: 5
 *                     AuthorEmail:
 *                       type: string
 *                       example: johndoe@example.com
 *                     IsPremium:
 *                       type: boolean
 *                       example: true
 *                     Title:
 *                       type: string
 *                       example: "Advanced Node.js Concepts"
 *                     Content:
 *                       type: string
 *                       example: "Node.js provides asynchronous event-driven architecture..."
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page);
        const blogs = await getBlogs(page);
        
        const result: BlogWithStatsAndTags[] = await Promise.all(
            blogs.map(async (blog) => {
                const likesAndCommentsCount = await getLikesAndCommentsCountFromBlog(blog.id!);
                const tags = await getBlogTags(blog.id!);

                return {
                    ...blog,
                    stats: likesAndCommentsCount[0],
                    tags: tags.map(t => t.tag)
                };
            })
        );

        const response: ApiResponse = {
            "error": false,
            "result": result,
            "page": page
        }
        res.status(StatusCodes.OK).json(response);
    } catch (err) {
        console.error(`error while fetching blogs: ${getErrorMessage(err)}`);
        next(err);
    }
});

router.get('/:id(\\d+)', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getBlogById(Number(req.params.id));
        const response: ApiResponse = {
            "error": false,
            "result": result
        }
        res.status(StatusCodes.OK).json(response);
    } catch (err) {
        console.error(`error: ${getErrorMessage(err)}, while fetching blog having id: ${req.params.id}`);
        next(err);
    }
});

router.get('/comments', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getCommentsFromBlogPaginated(Number(req.query.blogId), Number(req.query.page));
        const response: ApiResponse = {
            "error": false,
            "result": result,
            "page": Number(req.query.page)
        }
        res.status(StatusCodes.OK).json(response);
    } catch (err) {
        console.error(`error: ${getErrorMessage(err)}, while fetching blog having id: ${req.params.id}`);
        next(err);
    }
});

router.post('/like', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const like: LikeReq = {
            blogId: Number(req.body.blogId),
            ipAddress: String(req.ip),
            userEmail: req.body.email
        };
        
        const result = await addLikeToBlog(like);

        const response: ApiResponse = {
            "error": false,
            "result": result
        }
        res.status(StatusCodes.OK).json(response);
    } catch (err) {
        console.error(`error: ${getErrorMessage(err)}, while adding like to blog having id: ${req.body.bodyId}`);
        next(err);
    }
});

export default router;