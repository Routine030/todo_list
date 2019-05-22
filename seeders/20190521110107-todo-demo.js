'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
      return queryInterface.bulkInsert('todolists', [{
		content: 'todo demo',
		createdAt: new Date(),
		updatedAt: new Date()
      }], 
	  {
		  createdAt: new Date(),
		  updatedAt: new Date(),
          freezeTableName: false,
          paranoid: true
	  });    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.*/
      return queryInterface.bulkDelete('todolists', null, {});
    
  }
};
