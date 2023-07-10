'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      Car.belongsTo(models.Brand, {
        foreignKey: 'brand_id',
        as: 'brand',
      });
      Car.belongsTo(models.CarModel, {
        foreignKey: 'carModel_id',
        as: 'model',
      });
       
    }
  }
  Car.init({
    images:{
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    carModel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    km:{
      type: DataTypes.BIGINT,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    damage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    onSale: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};