'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Version extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Version.belongsTo(models.CarModel, {
        foreignKey: 'model_id',
        as: 'model',
      });
    }
  }
  Version.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Version',
  });
  return Version;
};