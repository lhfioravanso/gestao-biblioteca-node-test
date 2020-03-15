'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('books', [
        { 
          title: 'Livro Teste', 
          isbn: '12345',
          year: '2020',
          category_id: 1,
          createdAt: new Date(), 
          updatedAt: new Date() 
        }
      ], 
    {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('books', null, {});
  }
};
