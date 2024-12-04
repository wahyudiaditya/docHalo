'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const appointment = JSON.parse(fs.readFileSync('./data/appointments.json', 'utf-8'))

    await queryInterface.bulkInsert('Appointments', appointment)
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Appointments', null, {});
  }
};
