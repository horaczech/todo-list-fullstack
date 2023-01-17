import dotenv from 'dotenv';
import http from 'http';
import app from './src/app';
import {sequelize} from './src/models';

dotenv.config();

const port = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  sequelize.sync().then(() => {
    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  });
}

startServer();
