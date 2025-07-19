import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import convertRouter from './routes/convert';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

dotenv.config();

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use(express.json());
app.use('/api/convert', convertRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
