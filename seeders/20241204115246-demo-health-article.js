'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const healthArticle = JSON.parse(fs.readFileSync('./data/healthArticles.json', 'utf-8'))

    await queryInterface.bulkInsert('HealthArticles', healthArticle)
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('HealthArticles', null, {});
  }
};
