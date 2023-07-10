'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      image: 'default.jpeg',
      name: 'Nicolas',
      surname: 'Lain',
      email: 'nicolas@mail.com ',
      birthdate: '2002-10-12',
      phoneNumber: [['+54'],['1133615533']],
      password: '$2a$10$2Q4jJKJnTT4bxjCPuYuYbOz7hVQzWe/.tJY9fY4EcqIbpaGURExqu',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 2,
      image: 'default.jpeg',
      name: 'Maxi',
      surname: 'Pardo',
      email: 'maxipar@mail.com ',
      birthdate: '2001-6-10',
      phoneNumber: [['+54'],['1126790946']],
      password: '$2a$10$H8VnhEq2F07ayCGBOZhu2uTOSH6WcarPJ22gaKhAqOPig4YyBK8bu',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);          
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
 