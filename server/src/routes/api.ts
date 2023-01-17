import express, {Router} from 'express';
import tasksRouter from './task/router';

const api: Router = express.Router();

api.use('/tasks', tasksRouter);

export default api;
