const conn = require ("../models")
const upload = require('../middleware/upload')
const {createJWT} = require('../lib/jwt')
const {deleteFiles} = require('./../helper/deleteFiles')

module.exports = { //udah bisa namun belum ada validasi samsek
    loginUser: async (req, res, next) => {
        try {
            const {username, password} = req.query 
            const masuk = await conn.user.findOne({where: {username: username, password: password}});

            console.log(masuk);
            if(masuk == null) {
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
            console.log(masuk.dataValues.id)
            const token = await createJWT({id: masuk.dataValues.id}) // harus dikirim dalam object, karena masuk kedalam payload untuk diencode
            res.status(200).send({
                isError: false,
                message:"Welcome back, have a pleasant day!",
                data: token
            })
            //data token diatas yang akan kita masukan kemudian kedalam localStorage di bagian frontend
        } catch (error) {
            next(error)
        }
    },
    updateImagecashier: async (req, res, next) => {
        try {
            const image_user = JSON.parse(req.body)
            console.log(image_user)
        } catch (error) {
            console.log(error)
        }
    }
}
// ganbatte2023
