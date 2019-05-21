'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todolists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
		type: Sequelize.STRING
	  },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
	  deletedAt: {
        type: Sequelize.DATE
	  }
    },
	{
		freezeTableName: false,
		paranoid: true,
        charset: "utf8mb4",
        dialectOptions: {
        collate: "utf8mb4_unicode_ci"
        }
	}); 
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('todolists');
  }
};