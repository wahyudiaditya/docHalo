'use strict';

const fs = require('fs')
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let user = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))

    const saltRounds = 8;
    const updatedUsers = await Promise.all(user.map(async (el) => {
      const myPlaintextPassword = el.password;
      const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);

      return {
        username: el.username,
        email: el.email,
        role: el.role,
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }))

    await queryInterface.bulkInsert('Users', updatedUsers)

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});
  }
};
