"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpUpdateTask = exports.httpDeleteTaskById = exports.httpAddTask = exports.httpGetTaskById = exports.httpGetAllTasks = void 0;
const models_1 = __importDefault(require("../../models"));
const httpGetAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTasks = yield models_1.default.Task.findAll();
        if (allTasks) {
            res.status(200).json({
                data: allTasks
            });
        }
    }
    catch (e) {
        throw e;
    }
});
exports.httpGetAllTasks = httpGetAllTasks;
const httpGetTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const oneTask = yield models_1.default.Task.findByPk(id);
        if (oneTask) {
            res.status(200).json({
                data: oneTask
            });
        }
    }
    catch (e) {
        throw e;
    }
});
exports.httpGetTaskById = httpGetTaskById;
const httpAddTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const newTask = yield models_1.default.Task.create({
            title
        });
        res.status(201).json({
            data: newTask
        });
    }
    catch (e) {
        throw e;
    }
});
exports.httpAddTask = httpAddTask;
const httpDeleteTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!id) {
        res.status(400).send('Id not found');
    }
    try {
        yield models_1.default.Task.destroy({
            where: {
                id
            }
        });
        res.status(200).json('Task deleted');
    }
    catch (e) {
        throw e;
    }
});
exports.httpDeleteTaskById = httpDeleteTaskById;
const httpUpdateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { title } = req.body;
    try {
        if (!title) {
            res.status(422).json('Title field is required.');
        }
        const task = yield models_1.default.Task.findByPk(id);
        const updatedTask = yield task.update({ title });
        res.status(200).json({
            data: updatedTask
        });
    }
    catch (e) {
        throw e;
    }
});
exports.httpUpdateTask = httpUpdateTask;
