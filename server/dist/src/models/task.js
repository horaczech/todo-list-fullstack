"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTaskModel = (sequelize, DataTypes) => {
    return sequelize.define('task', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};
exports.default = getTaskModel;
