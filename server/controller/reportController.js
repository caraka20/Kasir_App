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
      const data = await db.transaction.findAll({
        attributes: [
          "product_name",
          "quantity",
          "product_price",
          "product_kategori",
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
      console.log("lala");
      const { awal, akhir } = req.query;
      console.log(awal);
      console.log(akhir);
      const dataAll = await db.transaction.findAll({
        attributes: [
          "product_name",
          "quantity",
          "product_price",
          "customer_name",
          "product_kategori",
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

      const jumlahSemuaTransaksi = await db.transaction.findAll({
        attributes: ["transaction_uid"],
        group: ["transaction_uid"],
        where: {
          createdAt: {
            [Op.between]: [awal, akhir],
          },
        },
      });
      const totalTransaksi = jumlahSemuaTransaksi.length;

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
    // console.log(totalProductPrice);
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

const rataRataPendapatan = total / jumlahHari;
// Membuat objek untuk melacak transaction_uid unik pada setiap createdAt
const transactionPerTgl = {};

data.forEach(item => {
  const { transaction_uid, createdAt } = item;
  if (transaction_uid && createdAt) {
    if (!transactionPerTgl[createdAt.toDateString()]) {
      transactionPerTgl[createdAt.toDateString()] = new Set();
    }
    transactionPerTgl[createdAt.toDateString()].add(transaction_uid);
  }
});

// Menghitung jumlah transaction_uid unik pada setiap createdAt
const result = Object.entries(transactionPerTgl).map(([createdAt, set]) => ({
  createdAt,
  total: set.size
}));
const totalTransaction = result.reduce((total, item) => total + item.total, 0);

// history transaksi
const historyTransaksi = {};

data.forEach(item => {
  const { createdAt, transaction_uid } = item;

  if (!historyTransaksi[createdAt.toDateString()]) {
    historyTransaksi[createdAt.toDateString()] = {};
  }

  if (!historyTransaksi[createdAt.toDateString()][transaction_uid]) {
    historyTransaksi[createdAt.toDateString()][transaction_uid] = [];
  }

  historyTransaksi[createdAt.toDateString()][transaction_uid].push(item);
});
console.log(historyTransaksi);
const dataFix =
  {
    tanggal_awal : awal,
    tanggal_akhir : akhir,
    total_pendapatan : total,
    jumlah_hari : jumlahHari,
    rata_rata_pendapatan_perDay: TotalPendapatanPerTgl,
    total_transaksi : totalTransaction,
    total_produk_terjual : totalProdukTerjual,
    kategori_paling_diminati : totalPerKategori,
    rata_rata_pendapatan : rataRataPendapatan,
    historyTransaksi : historyTransaksi,
    dataAll : dataAll,
    jumlahSemuaTransaksi : jumlahSemuaTransaksi
  }
  // console.log(dataFix);
      res.send({
        dataFix
      });

    } catch (error) {
      console.log(error);
    }
  },
  
};

// data = {
//   "Sun Sep 17 2023" : {
//     12341234 : [
//       1 = {
//         "product_name": "sepatu",
//         "quantity": 2,
//         "product_price": 2000,
//         "customer_name": "lala",
//         "transaction_uid": "12341234",
//         "status_transaksi": "payment",
//         "createdAt": "2023-09-16T18:55:54.000Z",
//         "product_kategori": "cofe",
//         "pembayaran": "Cash",
//         "tujuan_pembayaran": "",
//         "nama_kasir": "admin"
//       },
//       2 = {
//         "product_name": "sepeda",
//         "quantity": 3,
//         "product_price": 5000,
//         "customer_name": "bonbon",
//         "transaction_uid": "12341234",
//         "status_transaksi": "payment",
//         "createdAt": "2023-09-17T17:55:54.000Z",
//         "product_kategori": "no-cofe",
//         "pembayaran": "Cash",
//         "tujuan_pembayaran": "",
//         "nama_kasir": "admin"
//       }
//     ],
//     321321 : [
//       1 = {
//         "product_name": "baju",
//         "quantity": 3,
//         "product_price": 5000,
//         "customer_name": "bonbon",
//         "transaction_uid": "321321",
//         "status_transaksi": "payment",
//         "createdAt": "2023-09-17T18:55:54.000Z",
//         "product_kategori": "no-cofe",
//         "pembayaran": "Cash",
//         "tujuan_pembayaran": "",
//         "nama_kasir": "admin"
//       },
//       2 = {
//         "product_name": "celana",
//         "quantity": 3,
//         "product_price": 5000,
//         "customer_name": "bonbon",
//         "transaction_uid": "321321",
//         "status_transaksi": "payment",
//         "createdAt": "2023-09-17T18:55:50.000Z",
//         "product_kategori": "cofe",
//         "pembayaran": "Cash",
//         "tujuan_pembayaran": "",
//         "nama_kasir": "admin"
//       }
//     ],
//     "Sun Sep 18 2023" : {
//       111 : [
//         1 = {
//           "product_name": "susot",
//           "quantity": 3,
//           "product_price": 5000,
//           "customer_name": "bonbon",
//           "transaction_uid": "111",
//           "status_transaksi": "payment",
//           "createdAt": "2023-09-18T18:55:00.000Z",
//           "product_kategori": "food",
//           "pembayaran": "Cash",
//           "tujuan_pembayaran": "",
//           "nama_kasir": "admin"
//         },
//         2 = {
//           "product_name": "steak",
//           "quantity": 3,
//           "product_price": 5000,
//           "customer_name": "bonbon",
//           "transaction_uid": "111",
//           "status_transaksi": "payment",
//           "createdAt": "2023-09-18T15:55:54.000Z",
//           "product_kategori": "no-cofe",
//           "pembayaran": "Cash",
//           "tujuan_pembayaran": "",
//           "nama_kasir": "admin"
//         }
//       ]
//     }
//     }
//   }


// historyTransaksi = [
//   {
//     "2023-09-18" : [
//       111 
//     ]
//   }
// ]