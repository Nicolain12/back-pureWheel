'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ticket.belongsTo(models.User, {
        as: "user",
        foreignKey: "user_id"
      })

      Ticket.belongsTo(models.Car, {
        as: "car",
        foreignKey: "car_id"
      })
    }
  }
  Ticket.init({
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price:  {
      type: DataTypes.BIGINT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};