import {Sequelize, DataTypes} from 'sequelize';
import getTaskModel from './task';

const sequelize = new Sequelize(
  `postgres://bozotkuiekyqhc:f0a2644cd7da039c2e78e6d0167c749a3cf06ce375f9993df5c0a0630b20540d@ec2-63-32-248-14.eu-west-1.compute.amazonaws.com:5432/dagrttu9btdg5n`,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
    // host: 'localhost',
    // port: 5432
  }
);

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
