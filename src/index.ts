import express from 'express';
import { Request, Response } from 'express';
const app = express();
const port = 3000;

import { StatusCodes } from 'http-status-codes';

import homeRoute from './routes/homeRoute';
import loginRoute from './routes/loginRoute';
import signupRoute from './routes/signupRoute';
import errorHandler from './middleware/errorHandler';
import jwtValidate from './middleware/jwtValidate';

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.use('/', homeRoute);
app.use('/:id(\\d+)', homeRoute);

app.use('/login', loginRoute);
app.use('/signup', signupRoute);

app.use('/secret', [jwtValidate, (req: Request, res: Response) => {
    res.json({ "message": "very secret!!!" });
}]);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}`);
});