'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{
        email: 'admin',
        name: 'Admin',
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10), null),
        birth_date: new Date(),
        phone_number: '123456789',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
    
  }
};
