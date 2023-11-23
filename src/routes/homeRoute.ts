import express from 'express';
const router = express.Router();
import { getBlogs, getBlogById } from '../services/blog';
import { getErrorMessage } from '../utils/errorUtils';


router.get('/', async (req, res, next) => {
    try {
        res.json(await getBlogs());
    } catch (err) {
        console.error(`error while fetching blogs: ${getErrorMessage(err)}`);
        next(err);
    }
});

router.get('/:id(\\d+)', async (req, res, next) => {
    try {
        res.json(await getBlogById(Number(req.params.id)));
    } catch (err) {
        console.error(`error: ${getErrorMessage(err)}, while fetching blog having id: ${req.params.id}`);
        next(err);
    }
});

export default router;