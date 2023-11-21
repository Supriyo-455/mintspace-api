const express = require('express');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const auth = require('../services/auth');
const config = require('../config');

router.post('/', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = {
        "email": email,
        "password": password
    };

    try {
        const validUser = await auth.checkEmailAndPassword(email, password);
        if (validUser) {
            const token = jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.tokenLife })
            const refreshToken = jwt.sign(user, config.jwt.refreshTokenSecret, { expiresIn: config.jwt.refreshTokenLife })
            const response = {
                "status": "Logged in",
                "token": token,
                "refreshToken": refreshToken,
            }
            res.status(StatusCodes.OK).json(response);
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                "message": "wrong email or password!"
            });
        }
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;