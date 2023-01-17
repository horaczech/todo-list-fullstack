const getTaskModel = (sequelize, DataTypes) => {
  return sequelize.define(
    'task',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
};

export default getTaskModel;
