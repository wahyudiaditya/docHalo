'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userProfile = JSON.parse(fs.readFileSync('./data/userProfile.json', 'utf-8'))

    await queryInterface.bulkInsert('UserProfiles', userProfile)
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('UserProfiles', null, {});
  }
};
