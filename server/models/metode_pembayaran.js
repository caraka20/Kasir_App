'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class metode_pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({transaction}) {
      // define association here
      this.hasMany(transaction,{foreignKey:"metode_pembayaran_id"})
    }
  }
  metode_pembayaran.init({
    pembayaran: DataTypes.STRING,
    tujuan_pembayaran: DataTypes.STRING,
    createdAt : {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt : {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'metode_pembayaran',
  });
  return metode_pembayaran;
};
