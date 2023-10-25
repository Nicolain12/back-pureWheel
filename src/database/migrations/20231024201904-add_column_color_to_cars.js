'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('cars', 'color_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Colors', 
          key: 'id', 
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('cars', 'color_id')
    ]);
  },
};