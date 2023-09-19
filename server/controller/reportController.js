const db = require("../models");
const { sequelize } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  allTransaction: async (req, res, next) => {
    try {
      const data = await db.transaction.findAll({
        attributes: [
          "product_name",
          "quantity",
          "product_price",
          "customer_name",
          "transaction_uid",
          "status_transaksi",
          "createdAt",
          [sequelize.col("pembayaran"), "pembayaran"],
          [sequelize.col("tujuan_pembayaran"), "tujuan_pembayaran"],
          [sequelize.col("nama_lengkap"), "nama_kasir"],
        ],
        include: [
          {
            model: db.metode_pembayaran,
            attributes: [],
          },
          {
            model: db.user,
            attributes: [],
          },
        ],
      });
      res.send(data);
    } catch (error) {
      next(error);
    }
  },

  detailTransaction: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = await db.transaction.findOne({
        attributes: [
          "product_name",
          "quantity",
          "product_price",
          "customer_name",
          "transaction_uid",
          "status_transaksi",
          "createdAt",
          [sequelize.col("pembayaran"), "pembayaran"],
          [sequelize.col("tujuan_pembayaran"), "tujuan_pembayaran"],
          [sequelize.col("nama_lengkap"), "nama_kasir"],
        ],
        include: [
          {
            model: db.metode_pembayaran,
            attributes: [],
          },
          {
            model: db.user,
            attributes: [],
          },
        ],
        where: { transaction_uid: uid },
      });
      res.send(data);
    } catch (error) {
      next(error);
    }
  },

  transaksiPerTanggal: async (req, res, next) => {
    try {
      // rata rata penjualan hanya bisa 10 hari terahir
      const { awal, akhir } = req.query;

      const data = await db.transaction.findAll({
        attributes: [
          "product_name",
          "quantity",
          "product_price",
          "customer_name",
          "transaction_uid",
          "status_transaksi",
          "createdAt",
          [sequelize.col("pembayaran"), "pembayaran"],
          [sequelize.col("tujuan_pembayaran"), "tujuan_pembayaran"],
          [sequelize.col("nama_lengkap"), "nama_kasir"],
        ],
        include: [
          {
            model: db.metode_pembayaran,
            attributes: [],
          },
          {
            model: db.user,
            attributes: [],
          },
        ],
        where: {
          createdAt: {
            [Op.between]: [awal, akhir],
          },
        },
        // group : ["transaction.transaction_uid"]
      });

      const totalProdukTerjual = data.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);
      const totalPendapatan = data.reduce((acc, curr) => {
        return acc + curr.product_price;
      }, 0);
      const penjualanBerdasarkanKategori = await db.transaction.findAll({
        attributes: [
          "product_kategori",
          [
            sequelize.fn("COUNT", sequelize.col("product_kategori")),
            "total_produk",
          ],
        ],
        group: ["product_kategori"],
      });

      const jumlahTransaksi = await db.transaction.findAll({
        attributes: ["transaction_uid"],
        group: ["transaction_uid"],
      });
      const totalTransaksi = jumlahTransaksi.length;

      const penjualanBerdasarkanTanggal = data.map((item) => {
        return item.createdAt.toDateString()
      });

      const lala = await db.transaction.findAll({
        attributes: [
          [sequelize.fn('SUM', sequelize.literal('product_price')), 'total_profit']
        ],
        where: {
          createdAt: {
            [Op.between]: [awal, akhir]
          }
        }})

      res.send({
        lala,
      });

      // const data = await
    } catch (error) {
      console.log(error);
    }
  },
  
};
