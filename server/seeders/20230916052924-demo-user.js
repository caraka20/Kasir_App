'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id:1,
        nama_lengkap: "admin",
        username:"admin",
        email:"admin@gmail.com",
        password:"admin123",
        role:"admin",
        status_user:"active",
        image_user:"",
        code: "123"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
