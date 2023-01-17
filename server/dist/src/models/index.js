"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const task_1 = __importDefault(require("./task"));
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
});
exports.sequelize = sequelize;
const models = {
    Task: (0, task_1.default)(sequelize, sequelize_1.DataTypes)
};
models.Task.addScope('defaultScope', {
    order: [['id', 'ASC']]
}, { override: true });
exports.default = models;
