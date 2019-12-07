'use strict';
module.exports = (sequelize, DataTypes) => {
    const books = sequelize.define('books', {
        title: DataTypes.STRING,
        isbn: DataTypes.STRING,
        category_id: {
            type: DataTypes.INTEGER, 
            references: {
              model: 'categories', key: 'id'
            }
        },
        year: DataTypes.INTEGER
    }, {});
    
    return books;
};