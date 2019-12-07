'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        birth_date: DataTypes.DATE,
        phone_number: DataTypes.STRING
    }, {});

    users.beforeSave((user, options) => {
        if (user.changed('password')) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
    });

    users.prototype.validatePassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    
    return users;
};