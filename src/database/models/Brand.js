'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.hasMany(models.CarModel, {
        foreignKey: 'brand_id',
        as: 'carModels',
      });
      
    }
  }
  Brand.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};