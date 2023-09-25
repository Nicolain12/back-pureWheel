'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('cars', 'chassis_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Chasses', 
          key: 'id', 
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT', // You can choose the onDelete behavior that suits your needs
      }),
      queryInterface.addColumn('cars', 'version_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Versions', // Replace 'Versions' with the actual name of the referenced table
          key: 'id', // Replace 'id' with the actual name of the referenced column
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT', // You can choose the onDelete behavior that suits your needs
      }),
      queryInterface.addColumn('cars', 'engine', Sequelize.STRING),
      queryInterface.addColumn('cars', 'gas', Sequelize.STRING),
      queryInterface.addColumn('cars', 'transmission', Sequelize.STRING),
      queryInterface.addColumn('cars', 'doors', Sequelize.INTEGER),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('cars', 'chassis_id'),
      queryInterface.removeColumn('cars', 'version_id'),
      queryInterface.removeColumn('cars', 'engine'),
      queryInterface.removeColumn('cars', 'gas'),
      queryInterface.removeColumn('cars', 'transmission'),
      queryInterface.removeColumn('cars', 'doors'),
    ]);
  },
};
