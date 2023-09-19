const db = require('../models')


module.exports = {
    create: async (req, res, next) => {
        try {
            const {nama_kategori} = req.body
            console.log(nama_kategori);

            const createCategory = await db.kategori_produk.create({
                nama_kategori
            })

            res.status(200).send({
                isError: false,
                message:"Success Create",
                data: createCategory
            })
        } catch (error) {
            next(error)
        }
    }
}