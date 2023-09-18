const conn = require ("../models")

module.exports = { //udah bisa namun belum ada validasi samsek
    loginUser: async (req, res, next) => {
        try {
            const {username, password} = req.query 
            const masuk = await conn.user.findOne({where: {username: username, password: password}});
            if(!masuk) {
                throw {
                    isError: true,
                    message: "Username or password is invalid!"
                }
            }
            // Validasi ketika user cashier itu berstatus tidak aktif
            if(masuk && masuk.status_user == "inactive") { 
                throw {
                    isError: true,
                    message: "You are currently deactivated, please contact admin"
                }
            }
            res.status(200).send({
                isError: false,
                message:"Welcome back, have a pleasant day!",
                data: masuk
            })
            // const masuk = await conn.user.findOne()
        } catch (error) {
            next(error)
        }
    },
    // update: async(req, res, next) => {
    //     try{
    //         //1. Ambil id image
    //         const {idImage} = req.params
    //         //2. Ambil path images
    //         const findImage = await db.hotel_image.findOne({
    //             where: {
    //                 id:idImage
    //             }
    //         })
    //         //3. Update new path on tabel
    //         await db.hotel_image.update({url: req.files.images[0].path}, {where: {id: idImage}})

    //         //4. Delete image lama
    //         deleteFiles({images: [{path: findImage.dataValues.url}]}) // gini tulisnya karena bentuk objekt

    //         //5. Kirim response
    //         res.status(201).send({
    //             isError: false,
    //             message: "Image has been successfully updated!",
    //             data: null
    //         })
    //     } catch (error) {
    //         deleteFiles(req.files)
    //         next(error)
    //     }
    // }
}
// ganbatte2023