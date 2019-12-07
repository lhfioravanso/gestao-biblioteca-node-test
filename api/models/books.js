'use strict';
module.exports = (sequelize, DataTypes) => {
    var books = sequelize.define('books', {
        title: DataTypes.STRING,
        isbn: DataTypes.STRING,
        category: DataTypes.STRING,
        year: DataTypes.INTEGER
    }, {});
    
    return books;
};