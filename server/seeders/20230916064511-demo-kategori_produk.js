'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  await queryInterface.bulkInsert('kategori_produks', [
    {
     id: 1,
     nama_kategori : "Snack",
     image_kategori : "GiFrenchFries",
     status : "active"
    },
    {
     id: 2,
     nama_kategori : "Main Course",
     image_kategori : "PiBowlFood",
     status : "active"
    },
    {
     id: 3,
     nama_kategori : "Coffee",
     image_kategori : "CgCoffee",
     status : "active"
    },
    {
     id: 4,
     nama_kategori : "Non-Coffee",
     image_kategori : "BiDrink",
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
