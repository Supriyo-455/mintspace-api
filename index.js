const express = require('express');
const app = express();
const port = 3000;
const homeRoute = require('./routes/homeRoute');

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.use('/', homeRoute);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}`);
});