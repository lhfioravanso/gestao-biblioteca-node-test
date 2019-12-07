'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite_books = sequelize.define('favorite_books', {
    user_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'users', key: 'id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'books', key: 'id'
      }
    }
  }, {});

  return favorite_books;
};