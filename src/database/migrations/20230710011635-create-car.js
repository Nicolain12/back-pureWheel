'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      images: {
        allowNull: false,
        type: Sequelize.STRING
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      carModel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'CarModels',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      },
      brand_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Brands',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      },
      km: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      damage: {
        allowNull: true,
        type: Sequelize.STRING
      },
      onSale: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cars');
  }
};