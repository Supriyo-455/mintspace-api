import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from './config';
import { Express } from "express";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Mintspace Blogging Api',
          description: "API endpoints for mintspace a blogging api documented on swagger",
          contact: {
            name: "Supriyo Paul",
            email: "paulsupriyo64nk@gmail.com",
            url: "https://github.com/Supriyo-455/mintspace-api"
          },
          version: '1.0.0',
        },
        servers: [
          {
            url: `${config.origin}/`,
            description: "Local server"
          },
          {
            url: "<your live url here>",
            description: "Live server"
          },
        ]
      },

    apis: [
        "./src/routes/**/*.ts",
        "./src/**/*.ts"
    ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
      app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
    
export default swaggerDocs;