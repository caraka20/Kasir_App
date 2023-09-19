'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({cart,transaction}) {
      // define association here
      this.hasMany(cart,{foreignKey:"user_id"})
      this.hasMany(transaction,{foreignKey:"user_id"})
    }
  }
  user.init({
    nama_lengkap: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    status_user: DataTypes.STRING,
    code: DataTypes.STRING,
    image_user: DataTypes.STRING,
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
    modelName: 'user',
  });
  return user;
};