'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Brands', [
      {
        id: 1,
        name: 'Toyota',
        logo: 'Toyota.png'
      },
      {
        id: 2,
        name: 'Volkswagen',
        logo: 'Volkswagen.png'
      },
      {
        id: 3,
        name: 'Ford',
        logo: 'Ford.png'
      },
      {
        id: 4,
        name: 'Chevrolet',
        logo: 'Chevrolet.png'
      },
      {
        id: 5,
        name: 'Honda',
        logo: 'Honda.png'
      },
      {
        id: 6,
        name: 'BMW',
        logo: 'BMW.png'
      },
      {
        id: 7,
        name: 'Mercedes-Benz',
        logo: 'Mercedes-Benz.png'
      },
      {
        id: 8,
        name: 'Audi',
        logo: 'Audi.png'
      },
      {
        id: 9,
        name: 'Nissan',
        logo: 'Nissan.png'
      },
      {
        id: 10,
        name: 'Hyundai',
        logo: 'Hyundai.png'
      },
      {
        id: 11,
        name: 'Kia',
        logo: 'Kia.png'
      },
      {
        id: 12,
        name: 'Tesla',
        logo: 'Tesla.png'
      },
      {
        id: 13,
        name: 'Subaru',
        logo: 'Subaru.png'
      },
      {
        id: 14,
        name: 'Volvo',
        logo: 'Volvo.png'
      },
      {
        id: 15,
        name: 'Mazda',
        logo: 'Mazda.png'
      },
      {
        id: 16,
        name: 'Jaguar',
        logo: 'Jaguar.png'
      },
      {
        id: 17,
        name: 'Land Rover',
        logo: 'Land Rover.png'
      },
      {
        id: 18,
        name: 'Porsche',
        logo: 'Porsche.png'
      },
      {
        id: 19,
        name: 'Lexus',
        logo: 'Lexus.png'
      },
      {
        id: 20,
        name: 'Fiat',
        logo: 'Fiat.png'
      },
      {
        id: 21,
        name: 'Peugeot',
        logo: 'Peugeot.png'
      },
      {
        id: 22,
        name: 'Renault',
        logo: 'Renault.png'
      },
      {
        id: 23,
        name: 'Mitsubishi',
        logo: 'Mitsubishi.png'
      },
      {
        id: 24,
        name: 'Jeep',
        logo: 'Jeep.png'
      },
      {
        id: 25,
        name: 'Mini',
        logo: 'Mini.png'
      },
      {
        id: 26,
        name: 'Chrysler',
        logo: 'Chrysler.png'
      },
      {
        id: 27,
        name: 'Dodge',
        logo: 'Dodge.png'
      },
      {
        id: 28,
        name: 'GMC',
        logo: 'GMC.png'
      },
      {
        id: 29,
        name: 'Buick',
        logo: 'Buick.png'
      },
      {
        id: 30,
        name: 'Cadillac',
        logo: 'Cadillac.png'
      },
      {
        id: 31,
        name: 'Ferrari',
        logo: 'Ferrari.png'
      },
      {
        id: 32,
        name: 'Lamborghini',
        logo: 'Lamborghini.png'
      },
      {
        id: 33,
        name: 'Bugatti',
        logo: 'Bugatti.png'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Brands', null, {});
  }
};
