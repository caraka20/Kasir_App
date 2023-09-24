'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({kategori_produk, cart}) {
      this.belongsTo(kategori_produk,{foreignKey:"kategori_produk_id"})
      this.hasMany(cart,{foreignKey:"produk_id"})
    }
  }
  produk.init({
    nama_produk: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    status_product: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    image_product: DataTypes.STRING,
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
    modelName: 'produk',
  });
  return produk;
};