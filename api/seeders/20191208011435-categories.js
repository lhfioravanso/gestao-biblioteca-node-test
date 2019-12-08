'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('categories', [
        { name: 'Biografia', createdAt: new Date(), updatedAt: new Date() }, 
        { name: 'Fantasia', createdAt: new Date(), updatedAt: new Date() }, 
        { name: 'Horror', createdAt: new Date(), updatedAt: new Date() }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('categories', null, {});
  }
};
