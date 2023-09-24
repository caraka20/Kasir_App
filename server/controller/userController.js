const conn = require ("../models")
const upload = require('../middleware/upload')
const {createJWT} = require('../lib/jwt')
const {deleteFiles} = require('./../helper/deleteFiles')
const {match} = require("../helper/hashing")

module.exports = { //udah bisa namun belum ada validasi samsek
    loginUser: async (req, res, next) => {
        try {
            // console.log("klkl");
            const {username, password} = req.query
            // console.log(username, password);
            const masuk = await conn.user.findOne({where: {username: username}});
            console.log(">>",masuk.dataValues.password);

            const hasil = await match(password, masuk.dataValues.password)
            console.log(hasil);
            if(masuk == null) {
                throw {
                    status: 409,
                    isError: true,
                    message: "Username or password is invalid!"
                }
            }
            // Validasi ketika user cashier itu berstatus tidak aktif
            if(masuk && masuk.status_user == "inactive") { 
                throw {
                    status: 409,
                    isError: true,
                    message: "You are currently deactivated, please contact admin"
                }
            }
            // kondisi kalo paswordnya sqlah
            if (hasil === false) {
                throw {
                    status: 409,
                    isError: true,
                    message: "Password Salah"
                }
            }

            // console.log(masuk.dataValues.id)
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
    },
    getAllData: async (req, res, next) => {
    try {
    const {id} = req.dataToken
    console.log(id);
    const data = await conn.user.findByPk(id)
    res.status(200).send({
        isError:false,
        message:"All data successfully obtained!",
        data: data
    })
    } catch (error) {
        next(error)
    }
    }
}
// ganbatte2023
