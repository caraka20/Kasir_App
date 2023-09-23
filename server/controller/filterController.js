const db = require('../models')


module.exports = {
   filterAbjadAZ: async(req, res, next) => {
    try {
         //untuk filter huruf dari a-z
        const findProduk = await db.produk.findAll({
         order : [["nama_produk", "ASC"]]
        })

        res.status(200).send({
         isError: false,
         message: "filter A-Z Success",
         data:findProduk
        })
    } catch (error) {
        next(error)
    }
   },

   filterAbjadZA: async (req, res, next) => {
      try {
         //ini untuk filter Z-A
         const findFilter = await db.produk.findAll({
            order : [["nama_produk", "DESC"]]
         })

         res.status(200).send({
            isError: false,
            message :"filter Z-A Success",
            data: findFilter
         })
      } catch (error) {
         
      }
   },

   filterHargaHL: async (req, res, next) => {
      try {
         const filterHarga = await db.produk.findAll({
            order:[["harga", "ASC"]]
         })

         res.status(200).send({
            isError: false,
            message : "filter harga L-H Success",
            data: filterHarga
         })
      } catch (error) {
         next(error)
      }
   },

   filterHargaLH: async (req, res, next) => {
      try {
         const filterHargaLh = await db.produk.findAll({
            order:[["harga", "DESC"]]
         })

         res.status(200).send({
            isError: false,
            message : "filter harga H-L Success",
            data: filterHargaLh
         })
      } catch (error) {
         next(error)
      }
   },

   filterCategory : async(req, res, next) => {
      try {
         const {idKategori} = req.query
         // console.log(kategori_id);

         const filterProduk = await db.produk.findAll({
            where : {kategori_produk_id : idKategori}
         })
         res.status(200).send({
            isError : false,
            message : "berhasil filter produk",
            data : filterProduk
         })
      } catch (error) {
         next(error)
      }
   }
}