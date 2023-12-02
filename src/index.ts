import express from 'express';
import config from './config';
const app = express();
const port = config.port;

import homeRoute from './routes/homeRoute';
import loginRoute from './routes/loginRoute';
import signupRoute from './routes/signupRoute';
import blogCreateRoute from './routes/blogCreateRoute';

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

app.use('/create', [jwtValidate, blogCreateRoute]);

app.use(errorHandler);

app.listen(port || 80, '0.0.0.0', () => {
    console.log(`Mintspace api running..`);
});