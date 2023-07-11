'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Brands', [
      {
        id: 1,
        name: 'Toyota',
        logo: 'Toyota.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Volkswagen',
        logo: 'Volkswagen.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Ford',
        logo: 'Ford.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Chevrolet',
        logo: 'Chevrolet.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Honda',
        logo: 'Honda.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'BMW',
        logo: 'BMW.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Mercedes-Benz',
        logo: 'Mercedes-Benz.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Audi',
        logo: 'Audi.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'Nissan',
        logo: 'Nissan.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: 'Hyundai',
        logo: 'Hyundai.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: 'Kia',
        logo: 'Kia.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: 'Tesla',
        logo: 'Tesla.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        name: 'Subaru',
        logo: 'Subaru.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        name: 'Volvo',
        logo: 'Volvo.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        name: 'Mazda',
        logo: 'Mazda.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        name: 'Jaguar',
        logo: 'Jaguar.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        name: 'LandRover',
        logo: 'LandRover.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        name: 'Porsche',
        logo: 'Porsche.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        name: 'Lexus',
        logo: 'Lexus.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        name: 'Fiat',
        logo: 'Fiat.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        name: 'Peugeot',
        logo: 'Peugeot.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        name: 'Renault',
        logo: 'Renault.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        name: 'Mitsubishi',
        logo: 'Mitsubishi.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        name: 'Jeep',
        logo: 'Jeep.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        name: 'Mini',
        logo: 'Mini.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        name: 'Chrysler',
        logo: 'Chrysler.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        name: 'Dodge',
        logo: 'Dodge.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        name: 'GMC',
        logo: 'GMC.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        name: 'Buick',
        logo: 'Buick.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        name: 'Cadillac',
        logo: 'Cadillac.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        name: 'Ferrari',
        logo: 'Ferrari.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        name: 'Lamborghini',
        logo: 'Lamborghini.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        name: 'Bugatti',
        logo: 'Bugatti.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Brands', null, {});
  }
};