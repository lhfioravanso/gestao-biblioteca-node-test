'use strict';
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.INTEGER,
        phone_number: DataTypes.STRING
    }, {});
    
    return users;
};