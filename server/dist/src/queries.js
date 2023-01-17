"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTaskById = exports.newTask = exports.getTaskById = exports.getTasks = void 0;
exports.getTasks = 'SELECT * FROM tasks';
exports.getTaskById = 'SELECT * FROM tasks WHERE id = $1';
exports.newTask = 'INSERT INTO tasks (title) VALUES ($1)';
exports.deleteTaskById = 'DELETE FROM tasks WHERE id = $1';
exports.updateTask = 'UPDATE tasks SET title = $1 WHERE id = $2';
