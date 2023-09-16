'use strict';
const {
  Model
} = require('sequelize');
const produk = require('./produk');
module.exports = (sequelize, DataTypes) => {
  class kategori_produk extends Model {

    static associate({produk}) {
      // define association here
      this.hasMany(produk,{foreignKey:"kategori_produk_id"})
    }
  }
  kategori_produk.init({
    nama_kategori: DataTypes.STRING,
    image_kategori: DataTypes.STRING,
    status: DataTypes.STRING,
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
    modelName: 'kategori_produk',
  });
  return kategori_produk;
};
