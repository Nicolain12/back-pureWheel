'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('cars', 'bodyCar_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'BodyCars', 
          key: 'id', 
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      }),
      queryInterface.addColumn('cars', 'version_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Versions',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      }),
      queryInterface.addColumn('cars', 'engine', Sequelize.STRING),
      queryInterface.addColumn('cars', 'gas', Sequelize.STRING),
      queryInterface.addColumn('cars', 'transmission', Sequelize.STRING),
      queryInterface.addColumn('cars', 'doors', Sequelize.INTEGER),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('cars', 'bodyCar_id'),
      queryInterface.removeColumn('cars', 'version_id'),
      queryInterface.removeColumn('cars', 'engine'),
      queryInterface.removeColumn('cars', 'gas'),
      queryInterface.removeColumn('cars', 'transmission'),
      queryInterface.removeColumn('cars', 'doors'),
    ]);
  },
};