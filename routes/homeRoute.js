const express = require('express');
const router = express.Router();
const blogs = require('../services/blog');


router.get('/', async function (req, res, next) {
    try {
        res.json(await blogs.getBlogs());
    } catch (err) {
        console.error(`error while fetching blogs: ${err.message}`);
        next(err);
    }
});

module.exports = router;