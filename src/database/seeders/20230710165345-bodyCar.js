'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('BodyCars', [
      {
        id: 1,
        name: 'Cabriolet',
        image: 'Cabriolet.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Coupe',
        image: 'Coupe.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Deportive',
        image: 'Deportive.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Hatchback',
        image: 'Hatchback.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Pickup',
        image: 'Pickup.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Sedan',
        image: 'Sedan.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'SUV',
        image: 'SUV.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Van',
        image: 'Van.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BodyCars', null, {});
  }
};

