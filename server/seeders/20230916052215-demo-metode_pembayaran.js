'use strict';
//BELUM DI SEED!!!!!!!!
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('metode_pembayarans', [
      {
        id:1,
        pembayaran:"Cash",
        tujuan_pembayaran: ""
      },
      {
        id:2,
        pembayaran:"Bank Mandiri",
        tujuan_pembayaran:"1234567890"
      },
      {
        id:3,
        pembayaran:"Bank BCA",
        tujuan_pembayaran:"0987654321"
      },
      {
        id:4,
        pembayaran:"GoPay",
        tujuan_pembayaran:"081289091245"
      },
      {
        id: 5,
        pembayaran: "Dana",
        tujuan_pembayaran: "087189091234"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('metode_pembayarans', null, {});
  }
};
