const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
};