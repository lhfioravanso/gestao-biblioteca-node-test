'use strict';
module.exports = (sequelize, DataTypes) => {
    const books = sequelize.define('books', {
        title: DataTypes.STRING,
        isbn: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              isNumeric: true
          }
        },
        category_id: {
            type: DataTypes.INTEGER, 
            references: {
              model: 'categories', key: 'id'
            }
        },
        year: DataTypes.INTEGER
    }, {});

    books.associate = (models) => {
        books.belongsTo(models.categories, {
          foreignKey: 'category_id'
        });
    };
    
    return books;
};