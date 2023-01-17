import {Sequelize, DataTypes} from 'sequelize';
import getTaskModel from './task';

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
});

const models = {
  Task: getTaskModel(sequelize, DataTypes)
};

models.Task.addScope(
  'defaultScope',
  {
    order: [['id', 'ASC']]
  },
  {override: true}
);

export {sequelize};

export default models;
