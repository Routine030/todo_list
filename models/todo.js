'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    content: DataTypes.STRING
  }, {    freezeTableName: false,
    paranoid: true});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};