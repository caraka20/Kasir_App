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
      // console.log(awal + "lala");

      const data = await db.transaction.findAll({
        attributes: [
          "product_name",
          "quantity",
          "product_price",
          "customer_name",
          "transaction_uid",
          "status_transaksi",
          "createdAt",
          "product_kategori",
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

const totalPerKategori = {};

data.forEach(item => {
    const kategori = item.product_kategori;
    const jumlah = item.quantity;

    if (kategori in totalPerKategori) {
        totalPerKategori[kategori] += jumlah;
    } else {
        totalPerKategori[kategori] = jumlah;
    }
});
      const totalProdukTerjual = data.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);
      const totalPendapatan = data.reduce((acc, curr) => {
        return acc + curr.product_price;
      }, 0);

      const jumlahTransaksi = await db.transaction.findAll({
        attributes: ["transaction_uid"],
        group: ["transaction_uid"],
      });
      const totalTransaksi = jumlahTransaksi.length;

    // Membuat objek untuk menyimpan data berdasarkan tanggal
    const groupedData = {};

    // Mengelompokkan data berdasarkan tanggal
    const test = data.map(item => {
      const createdAtDate = item.createdAt.toDateString(); // Mendapatkan tanggal saja (tanpa waktu)

      if (!groupedData[createdAtDate]) {
        groupedData[createdAtDate] = [];
      }
  
      groupedData[createdAtDate].push(item);
    });
    // res.send(groupedData)
    // Mengonversi objek menjadi array
    const dataTgl = Object.keys(groupedData).map(date => ({
      date,
      data: groupedData[date]
    }));
// console.log(dataTgl);
    const TotalPendapatanPerTgl = {};
    dataTgl.forEach(item => {
      const date = item.date;
      const data = item.data;
    
      const totalProductPrice = data.reduce((acc, curr) => acc + curr.product_price, 0);
    console.log(totalProductPrice);
      if (!TotalPendapatanPerTgl[date]) {
        TotalPendapatanPerTgl[date] = 0;
      }
    
      TotalPendapatanPerTgl[date] += totalProductPrice;
    });
    // const jumlahProperti = Object.keys(TotalTotalPendapatanPerTgl).length;
const tanggal = Object.keys(TotalPendapatanPerTgl);
const jumlahHari = tanggal.length;

let total = 0;

for (const tgl in TotalPendapatanPerTgl) {
  total += TotalPendapatanPerTgl[tgl];
}
console.log(TotalPendapatanPerTgl);
console.log(totalPerKategori);

const rataRataPendapatan = total / jumlahHari;
const dataFix =
  {
    tanggal_awal : awal,
    tanggal_akhir : akhir,
    total_pendapatan : total,
    jumlah_hari : jumlahHari,
    rata_rata_pendapatan_perDay: TotalPendapatanPerTgl,
    total_transaksi : totalTransaksi,
    total_produk_terjual : totalProdukTerjual,
    kategori_paling_diminati : totalPerKategori,
    rata_rata_pendapatan : rataRataPendapatan
  }
  // console.log(dataFix);
      res.send({
        dataFix,
      });

    } catch (error) {
      console.log(error);
    }
  },
  
};
