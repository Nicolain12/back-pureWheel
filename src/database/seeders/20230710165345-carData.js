'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cars', [
      {
        id: 1,
        images: JSON.stringify(['lambo1.jpeg','lambo2.jpeg','lambo3.jpeg','lambo4.jpeg','lambo5.jpeg','lambo6.jpeg','lambo7.jpeg']),
        year: 2020,
        carModel_id: 541,
        brand_id: 32,
        user_id: 1,
        km: 10000,
        color: 'white',
        description: 'INTERIOR COLOR: Black w/ red stitching | ENGINE: V10',
        price: 253777,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        images: JSON.stringify(['ferrari1.jpeg','ferrari2.jpeg','ferrari3.jpeg','ferrari4.jpeg','ferrari5.jpeg','ferrari6.jpeg','ferrari7.jpeg']),
        year: 2013,
        carModel_id: 530,
        brand_id: 31,
        user_id: 1,
        km: 10000,
        color: 'red',
        description: 'Engine: 6.3 L F140 FC V12',
        price: 325000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        images: JSON.stringify(['porsche1.png','porsche2.png','porsche3.png','porsche4.png','porsche5.png','porsche6.png','porsche7.png']),
        year: 2013,
        carModel_id: 399,
        brand_id: 18,
        user_id: 1,
        km: 10000,
        color: 'black',
        description: 'coupe, turbo and eight-speed dual-clutch automatic transmission',
        price: 123000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        images: JSON.stringify(['bugatti1.webp','bugatti2.webp','bugatti3.webp','bugatti4.webp','bugatti5.webp','bugatti6.webp']),
        year: 2023,
        carModel_id: 541,
        brand_id: 33,
        user_id: 1,
        km: 5000,
        color: 'black',
        description: '8.0-liter 16-cylinder powerplant. four turbochargers that generate 1500 horsepower and 1180 pound-feet of torque.',
        price: 3000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        images: JSON.stringify(['jaguar1.webp','jaguar2.webp','jaguar3.webp','jaguar4.webp','jaguar5.webp','jaguar6.webp']),
        year: 2015,
        carModel_id: 374,
        brand_id: 16,
        user_id: 1,
        km: 40000,
        color: 'ornage',
        description: 'Powered by a supercharged 5.0-liter V8 linked to an eight-speed automatic transmission.',
        price: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cars', null, {});
  }
};
