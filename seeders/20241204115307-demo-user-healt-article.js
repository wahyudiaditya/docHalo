'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userHealthArticle = JSON.parse(fs.readFileSync('./data/userHealthArticle.json', 'utf-8'))

    await queryInterface.bulkInsert('UserHealthArticles', userHealthArticle)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserHealthArticles', null, {});
  }
};
