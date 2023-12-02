import express from 'express';
import config from './config';
const app = express();
const port = config.port;

import v1router from './routes/v1/router';

import apiVersionHandler from './middleware/apiVersionHandler';

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.use(apiVersionHandler);

app.use('/v1', v1router);


app.listen(port || 3000, '0.0.0.0', () => {
    console.log(`Mintspace api running..`);
});