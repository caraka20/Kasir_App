'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user,metode_pembayaran}) {
      // define association here
      this.belongsTo(user,{foreignKey:"user_id"})
      this.belongsTo(metode_pembayaran,{foreignKey:"metode_pembayaran_id"})
    }
  }
  transaction.init({
    product_name: DataTypes.STRING,
    product_kategori: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    product_price: DataTypes.INTEGER,
    customer_name: DataTypes.STRING,
    transaction_uid: DataTypes.STRING,
    status_transaksi: DataTypes.STRING,
    nama_kasir: DataTypes.STRING,
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
    modelName: 'transaction',
  });
  return transaction;
};