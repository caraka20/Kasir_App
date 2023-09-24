"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ transaction, metode_pembayaran }) {
      // define association here

      this.belongsTo(transaction, { foreignKey: "transaction_id" });
      this.belongsTo(metode_pembayaran, { foreignKey: "metode_pembayaran_id" });
    }
  }
  receipt.init(
    {
      total_price: DataTypes.INTEGER,
      customer_name: DataTypes.STRING,
      customer_changes: DataTypes.INTEGER,
      customer_money: DataTypes.INTEGER,
      transaction_uid: DataTypes.STRING,
      payment_method: DataTypes.STRING,
      createdAt : {
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updatedAt : {
        type: DataTypes.DATE,
        defaultValue: new Date()
      }
    },
    {
      sequelize,
      modelName: "receipt",
    }
  );
  return receipt;
};
