const db = require('../models')


module.exports = {
    getData : async (req, res, next) => {
        try {
            // console.log("ok");
            const findAllData = await db.kategori_produk.findAll()
            res.status(200).send({
                isError: false, 
                message : "Succes Get Data",
                data : findAllData
            })
        } catch (error) {
            next(error)
        }
    },

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
                nama_kategori, status : "active"
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
            // console.log(id);
            const {nama_kategori} = req.body

            const idCategory = await db.kategori_produk.findByPk(id)
            console.log(idCategory);

           const updateCategoriProduk = await db.kategori_produk.update(
                {
                    nama_kategori
                },
                {
                    where: {id : id}
                }
            )
            console.log(updateCategoriProduk);

            const afterIdCategory = await db.kategori_produk.findByPk(id)

            res.status(200).send({
                isError:false, 
                message: "Success Update Category",
                data: afterIdCategory.dataValues
            })
        } catch (error) {
            next(error)
        }
    },

    updateStatus : async (req, res, next) => {
        try {
            const {idStatus} = req.params

            const idStatuss = await db.kategori_produk.findByPk(idStatus)
            console.log(idStatuss.dataValues.status);
            const data = {}
            console.log(data);
            if (idStatuss.dataValues.status === "active") {
                data["status"] = "Non-Active"
            } else {
                data["status"] = "active"
            }
            console.log(data);
            const updateStatusCategory = await db.kategori_produk.update(
                {
                    status : data.status
                },
                {
                    where : {id : idStatus}
                }
            )
            const idStatusAfter = await db.kategori_produk.findByPk(idStatus)
            // console.log(idStatusAfter);
            res.status(200).send({
                isError: false,
                message: "Success update status",
                data: idStatusAfter
            })
        } catch (error) {
            
        }
    }
}