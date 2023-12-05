'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Colors', [
      {
        id: 1,
        name: 'White',
        code: '#FFFFFF',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 2,
        name: 'Red',
        code: '#FF0000',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 3,
        name: 'Black',
        code: '#000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 4,
        name: 'Ornage',
        code: '#FFA500',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 5,
        name: 'Gray',
        code: '#808080',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 6,
        name: 'Blue',
        code: '#0000FF',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Colors', null, {});
  },
};
