'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pages', {
      // определение полей таблицы
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    // добавление уникального ограничения на поле title
    await queryInterface.addConstraint('pages', {
      fields: ['title'],
      type: 'unique',
      name: 'unique_title_constraint',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Pages');
  }
};
