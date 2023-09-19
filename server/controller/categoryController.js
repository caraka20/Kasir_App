const db = require('../models')


module.exports = {
    create: async (req, res, next) => {
        try {
            const {nama_kategori} = req.body
            console.log(nama_kategori);

            if(!nama_kategori) {
                throw {message: "Maaf Data tolong di isi...!!"}
            }

           const findCategoriProduk = await db.kategori_produk.findOne({
                where : {nama_kategori : nama_kategori}
            })
            console.log(findCategoriProduk);

            if(findCategoriProduk) {
                throw {message : "Nama Category Sudah Tersedia Harap Ganti"}
            }

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
    },

    updateCategori: async(req, res, next) =>{
        try {
            const {id} = req.params
            console.log(id);
            // const {}
        } catch (error) {
            
        }
    }
}