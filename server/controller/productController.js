const db = require('../models')

module.exports = {
    create: async (req, res, next) => {
        try {
            const {nama_produk, deskripsi, stock, status_product} = req.body
            // console.log(nama_produk);
            const createProduk = await db.produk.create({
                nama_produk, deskripsi, 
            })
        } catch (error) {
            next(error)
        }
    }
}