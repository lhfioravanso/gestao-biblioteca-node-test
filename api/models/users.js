'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                minChars: (value) => {
                    if(value.length < 6)
                        throw new Error('Senha deve possuir pelo menos 6 caracteres.');
                }
            }
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }
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