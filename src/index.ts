import express from 'express';
import config from './config';
import cors from "cors";
import v1Router from './routes/v1/router';
import v2Router from './routes/v2/routes';
import apiVersionHandler from './middleware/apiVersionHandler';
import swaggerDocs from './swagger';

const app = express();

swaggerDocs(app);

app.use(cors({origin: "*"}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.use(apiVersionHandler);

app.use('/v1', v1Router);

app.listen(config.port || 3000, '0.0.0.0', () => {
    console.log(`Mintspace api running at ${config.origin}/`);
});