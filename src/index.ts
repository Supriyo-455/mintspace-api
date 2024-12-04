import express from 'express';
import config from './config';
import cors from "cors";
import v1router from './routes/v1/router';
import apiVersionHandler from './middleware/apiVersionHandler';

const app = express();

app.use(cors({origin: "*"}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.use(apiVersionHandler);

app.use('/v1', v1router);


app.listen(config.port || 3000, '0.0.0.0', () => {
    console.log(`Mintspace api running at ${config.origin}/`);
});