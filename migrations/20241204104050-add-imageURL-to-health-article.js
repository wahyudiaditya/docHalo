'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('HealthArticles', 'imageURL', Sequelize.DataTypes.STRING)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('HealthArticles', 'imageURL')
  }
};
