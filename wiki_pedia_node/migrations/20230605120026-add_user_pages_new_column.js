'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('pages', 'author', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('pages', 'lastUpdatedBy', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('pages', 'author');
    await queryInterface.removeColumn('pages', 'lastUpdatedBy');
  }
};
