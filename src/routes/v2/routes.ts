import express from 'express';
import blogsRoute from './blogsRoute';
import blogCreateRoute from './blogCreateRoute';

const router = express.Router();

router.use('/blogs', blogsRoute);
router.use('/blogs/:id(\\d+)', blogsRoute);

router.use('/create', blogCreateRoute);

export default router;