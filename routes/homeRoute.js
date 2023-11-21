const express = require('express');
const router = express.Router();
const blogs = require('../services/blog');


router.get('/', async (req, res, next) => {
    try {
        res.json(await blogs.getBlogs());
    } catch (err) {
        console.error(`error while fetching blogs: ${err.message}`);
        next(err);
    }
});

router.get('/:id(\\d+)', async (req, res, next) => {
    try {
        res.json(await blogs.getBlogById(req.params.id));
    } catch (err) {
        console.error(`error: ${err.message}, while fetching blog having id: ${req.params.id}`);
        next(err);
    }
});

module.exports = router;