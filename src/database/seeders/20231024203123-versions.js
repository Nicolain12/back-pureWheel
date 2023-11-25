'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Versions', [
      {
        id: 1,
        name:'shelby',
        model_id: 61,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Versions', null, {});
  }
};