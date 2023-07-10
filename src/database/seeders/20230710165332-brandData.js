'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Brands', [

      {
        name: 'Toyota',
        logo: 'Toyota.png'
      },
      {
        name: 'Volkswagen',
        logo: 'Volkswagen.png'
      },
      {
        name: 'Ford',
        logo: 'Ford.png'
      },
      {
        name: 'Chevrolet',
        logo: 'Chevrolet.png'
      },
      {
        name: 'Honda',
        logo: 'Honda.png'
      },
      {
        name: 'BMW',
        logo: 'BMW.png'
      },
      {
        name: 'Mercedes-Benz',
        logo: 'Mercedes-Benz.png'
      },
      {
        name: 'Audi',
        logo: 'Audi.png'
      },
      {
        name: 'Nissan',
        logo: 'Nissan.png'
      },
      {
        name: 'Hyundai',
        logo: 'Hyundai.png'
      },
      {
        name: 'Kia',
        logo: 'Kia.png'
      },
      {
        name: 'Tesla',
        logo: 'Tesla.png'
      },
      {
        name: 'Subaru',
        logo: 'Subaru.png'
      },
      {
        name: 'Volvo',
        logo: 'Volvo.png'
      },
      {
        name: 'Mazda',
        logo: 'Mazda.png'
      },
      {
        name: 'Jaguar',
        logo: 'Jaguar.png'
      },
      {
        name: 'Land Rover',
        logo: 'Land Rover.png'
      },
{
        name: 'Porsche',
        logo: 'Porsche.png'
      },
      {
        name: 'Lexus',
        logo: 'Lexus.png'
      },
      {
        name: 'Fiat',
        logo: 'Fiat.png'
      },
      {
        name: 'Peugeot',
        logo: 'Peugeot.png'
      },
      {
        name: 'Renault',
        logo: 'Renault.png'
      },
      {
        name: 'Mitsubishi',
        logo: 'Mitsubishi.png'
      },
      {
        name: 'Jeep',
        logo: 'Jeep.png'
      },
      {
        name: 'Mini',
        logo: 'Mini.png'
      },
      {
        name: 'Chrysler',
        logo: 'Chrysler.png'
      },
      {
        name: 'Dodge',
        logo: 'Dodge.png'
      },
      {
        name: 'GMC',
        logo: 'GMC.png'
      },
      {
        name: 'Buick',
        logo: 'Buick.png'
      },
      {
        name: 'Cadillac',
        logo: 'Cadillac.png'
      },
      {
        name: 'Ferrari',
        logo: 'Ferrari.png'
      },
      {
        name: 'Lamborghini',
        logo: 'Lamborghini.png'
      },
      {
        name: 'Bugatti',
        logo: 'Bugatti.png'
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Brands', null, {});
  }
};
