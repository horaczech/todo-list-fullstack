import express, {Router} from 'express';
import {httpAddTask, httpDeleteTaskById, httpGetAllTasks, httpGetTaskById, httpUpdateTask} from './controller';

const tasksRouter: Router = express.Router();

/**
 * @swagger
 * /v1/tasks:
 *  get:
 *    description: Get all tasks
 *    responses:
 *      200:
 *        description: Success
 */
tasksRouter.get('/', httpGetAllTasks);

/**
 * @swagger
 * /v1/tasks/:id:
 *  get:
 *    description: Get one task
 *    responses:
 *      200:
 *        description: Success
 */
tasksRouter.get('/:id', httpGetTaskById);

/**
 * @swagger
 * /v1/tasks:
 *  post:
 *    description: Add a new task
 *    responses:
 *      201:
 *        description: Success
 */
tasksRouter.post('/', httpAddTask);

/**
 * @swagger
 * /v1/tasks/:id:
 *  delete:
 *    description: Delete task
 *    responses:
 *      200:
 *        description: Success
 */
tasksRouter.delete('/:id', httpDeleteTaskById);

/**
 * @swagger
 * /v1/tasks/:id:
 *  put:
 *    description: Update a task
 *    responses:
 *      200:
 *        description: Success
 */
tasksRouter.put('/:id', httpUpdateTask);

export default tasksRouter;
