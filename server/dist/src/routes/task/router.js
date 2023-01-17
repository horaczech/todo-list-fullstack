"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const tasksRouter = express_1.default.Router();
/**
 * @swagger
 * /v1/tasks:
 *  get:
 *    description: Get all tasks
 *    responses:
 *      200:
 *        description: Success
 */
tasksRouter.get('/', controller_1.httpGetAllTasks);
/**
 * @swagger
 * /v1/tasks/:id:
 *  get:
 *    description: Get one task
 *    responses:
 *      200:
 *        description: Success
 */
tasksRouter.get('/:id', controller_1.httpGetTaskById);
/**
 * @swagger
 * /v1/tasks:
 *  post:
 *    description: Add a new task
 *    responses:
 *      201:
 *        description: Success
 */
tasksRouter.post('/', controller_1.httpAddTask);
/**
 * @swagger
 * /v1/tasks/:id:
 *  delete:
 *    description: Delete task
 *    responses:
 *      200:
 *        description: Success
 */
tasksRouter.delete('/:id', controller_1.httpDeleteTaskById);
/**
 * @swagger
 * /v1/tasks/:id:
 *  put:
 *    description: Update a task
 *    responses:
 *      200:
 *        description: Success
 */
tasksRouter.put('/:id', controller_1.httpUpdateTask);
exports.default = tasksRouter;
