module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('todolists', {
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: false,
    paranoid: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  });
  return Todo;
};
