'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fav extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fav.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id"
      })

      Fav.belongsTo(models.Car, {
        as: "car",
        foreignKey: "car_id"
      })
    }
  }
  Fav.init({
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Fav',
  });
  return Fav;
};