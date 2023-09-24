'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  await queryInterface.bulkInsert('kategori_produks', [
    {
     id: 1,
     nama_kategori : "Snack",
     status : "active"
    },
    {
     id: 2,
     nama_kategori : "Main Course",
     status : "active"
    },
    {
     id: 3,
     nama_kategori : "Coffee",
     status : "active"
    },
    {
     id: 4,
     nama_kategori : "Non-Coffee",
     status : "active"
    },
], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
