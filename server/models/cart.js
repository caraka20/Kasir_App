"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ produk, user }) {
      // define association here
      this.belongsTo(produk, { foreignKey: "produk_id" });
      this.belongsTo(user, { foreignKey: "user_id" });
    }
  }
  cart.init(
    {
      quantity: DataTypes.INTEGER,
      note: { type: DataTypes.STRING, defaultValue: null },

      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "cart",
    }
  );
  return cart;
};
