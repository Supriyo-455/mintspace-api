const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const config = require('../config');

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.jwt.secret, (err, decoded) => {
            if (err) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ "error": true, "message": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(StatusCodes.FORBIDDEN).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
};