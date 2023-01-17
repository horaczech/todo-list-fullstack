import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import api from './routes/api';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const app: Express = express();

app.use(
  cors({
    // origin: 'http://localhost:3000'
    origin: '*'
  })
);
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fullstack TODO app using Express and React.js',
      version: '0.1.0',
      description: '',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'LogRocket',
        url: 'https://logrocket.com',
        email: 'info@email.com'
      }
    },
    servers: [
      {
        url: process.env.ENV_URL || 'http://localhost:8000'
      }
    ]
  },
  apis: [path.join(__dirname, 'routes', '*', '*.js')]
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.get(/^(?!(\/v1|\/api-docs)).*/, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use('/v1', api);

export default app;
