'use strict';
module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define('categories', {
      name: DataTypes.STRING
    }, {});
    
  return categories;
};