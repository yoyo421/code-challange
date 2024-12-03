import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { router } from './routes/index.mjs';

const app = express();
const port = 8080;

app.use(cors());
app.use(morgan('dev'));
app.use(json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.mjs'], // files containing annotations as above
};

app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
