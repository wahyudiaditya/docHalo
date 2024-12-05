'use strict';

const fs = require('fs')
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let getDoctors = JSON.parse(fs.readFileSync('./data/doctors.json', 'utf-8'))

    const saltRounds = 8;
    const doctors = await Promise.all(getDoctors.map(async (el) => {
      const myPlaintextPassword = el.password;
      const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);

      return {
        contactNumber: el.contactNumber,
        specialization: el.specialization,
        firstName: el.firstName,
        lastName: el.lastName,
        username: el.username,
        email: el.email,
        password: hash,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
      };
    }))

    await queryInterface.bulkInsert('Doctors', doctors)
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Doctors', null, {});
  }
};
