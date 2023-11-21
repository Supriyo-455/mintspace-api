const express = require('express');
const router = express.Router();
const auth = require('../services/auth');

router.post('/', async (req, res, next) => {
    const user = {
        "email": req.body.email,
        "name": req.body.name,
        "password": req.body.password,
        "dateOfBirth": req.body.dateOfBirth,
        "dateOfCreation": req.body.dateOfCreation,
        "admin": req.body.admin
    };

    try {
        res.json(await auth.createUser(user));
    } catch (err) {
        console.error("error while creating user ", err.message);
        next(err);  // TODO: change error message
    }
});


module.exports = router;