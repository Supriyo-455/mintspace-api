const express = require('express');
const app = express();
const port = 3000;

const { StatusCodes } = require('http-status-codes');

const homeRoute = require('./routes/homeRoute');
const loginRoute = require('./routes/loginRoute');
const signupRoute = require('./routes/signupRoute');
const errorHandler = require('./middleware/errorHandler');
const jwtValidate = require('./middleware/jwtValidate');

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.use('/', homeRoute);
app.use('/:id(\\d+)', homeRoute);

app.use('/login', loginRoute);
app.use('/signup', signupRoute);

app.use('/secret', [jwtValidate, (req, res) => {
    res.json({ "message": "very secret!!!" });
}]);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}`);
});