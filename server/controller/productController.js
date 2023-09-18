const db = require('../models')

module.exports = {
    create: async (req, res, next) => {
        try {
            const {nama_produk, deskripsi, stock, status_product, harga, kategori_produk_id} = req.body
            // console.log(nama_produk);

            // Validasi data tidak boleh kosong
            if(!nama_produk && !deskripsi && !stock && !status_product && !harga && !kategori_produk_id) {
                throw {message : "Tolong... Lengkapi data"}
            }

            if(harga < 5000) {
                throw {
                    status: 409,
                    message: "Harga minimum 5000"
                }
            }

            if(stock < 1) {
                throw {
                    status: 409,
                    message:"Stock Jangan 0 woy..."
                }
            }

            // mencari column nama_produk di dalam table produk
            const product = await db.produk.findOne({
                where: {nama_produk: nama_produk}
            })
            console.log(product);

            // validasi nama_produk tidak boleh sama
            if(product) {
                throw{
                    status: 409,
                    message : "Produk sudah tersedia harap ganti"
                }  
            }

            const createProduk = await db.produk.create({
                nama_produk, deskripsi, stock, status_product, harga
            })
            
            res.status(200).send({
                isError: false,
                message: "Success Membuat produk",
                data: createProduk
            })
        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            //mengecek id
            const { id }= req.params
            // mengecek isi body
            const {nama_produk, deskripsi, stock, status_product, harga, kategori_produk_id}  = req.body
            console.log(id);
            console.log(nama_produk);

            if(stock < 1) {
                throw {message:"Jangan edit stock kurang dari 1"}
            }

            if(harga < 5000) {
                throw {message : "Jangan edit harga kurang dari 5000"}
            }

            //ambil data produk dengan id yang sesuai dengan param
            const idProduct = await db.produk.findByPk(id)
            // console.log(idProduct); 

            const updateProduk = await db.produk.update(
                {
                  ...idProduct, nama_produk, deskripsi, stock, status_product, harga, kategori_produk_id
                }, 
                {
                    where: {id : id}
                }
            )
                console.log(updateProduk);
            
            const afterUpdateProduk = await db.produk.findByPk(id)
            console.log(afterUpdateProduk);

            res.status(200).send({
                isError: false,
                message: "Success Update",
                data: afterUpdateProduk.dataValues
            })

        } catch (error) {
            next(error)
        }
    },

    deleteStatus: async (req, res, next) => {
        try {
            const { id } = req.params
            const { status_product } = req.body
            console.log(id);
            console.log(status_product);

            const idProductStatus = await db.produk.findByPk(id)
            console.log(idProductStatus.dataValues);

            const edtiStatus = await db.produk.update(
                {
                    status_product
                },
                {
                    where: {id : id}
                }
            )

            const afterIdProdukStatus = await db.produk.findByPk(id)

            res.status(200).send({
                isError: false,
                message : "Status berhasil di update",
                data: afterIdProdukStatus.dataValues
            })
        } catch (error) {
            next(error)
        }
    }
}