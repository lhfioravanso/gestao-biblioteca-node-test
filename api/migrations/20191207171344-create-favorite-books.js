'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('favorite_books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      book_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'books', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
      .then(() => {
        return queryInterface.addConstraint('favorite_books', ['user_id', 'book_id'], {
          type: 'unique',
          name: 'unique_book_per_user'
        });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('favorite_books');
  }
};