"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const task_1 = __importDefault(require("./task"));
const sequelize = new sequelize_1.Sequelize(`postgres://bozotkuiekyqhc:f0a2644cd7da039c2e78e6d0167c749a3cf06ce375f9993df5c0a0630b20540d@ec2-63-32-248-14.eu-west-1.compute.amazonaws.com:5432/dagrttu9btdg5n`, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
    // host: 'localhost',
    // port: 5432
});
exports.sequelize = sequelize;
const models = {
    Task: (0, task_1.default)(sequelize, sequelize_1.DataTypes)
};
models.Task.addScope('defaultScope', {
    order: [['id', 'ASC']]
}, { override: true });
exports.default = models;
