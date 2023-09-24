const db = require("../models")
const {deleteFiles} = require('../helper/deleteFiles')
const {hash, } = require("../helper/hashing")

module.exports = {
    createKasir : async (req, res, next) => {
        try {
            // console.log("hemm");
            const data = JSON.parse(req.body.data)
            
            // get data user dengan menargetkan username
            const userCashier = await db.user.findOne({
                where : {username : data.username}
            })
            console.log(data);
            //validasi username gak boleh sama
            if(userCashier) {
                throw {message : "Username Sudah tersedia Harap Ganti"}
            }
            console.log("haha");
            // get data user dengan menargetkan email
            const emailUser = await db.user.findOne({
                where : {email : data.email}
            })
            // console.log(emailUser);
            // validasi email gak boleh sama
            if(emailUser)  {
                throw {message : "Email Sudah tersedia Harap Ganti"}
            }
            
            const image = req.files.images.map(idx => {
                return {image_user: idx.path}
            })
            // console.log(image);

            const hasilHash = await hash(data.password, 10);
            const creatKasirr = await db.user.create({
                nama_lengkap : data.nama_lengkap, role : "cashier", username : data.username, password : hasilHash, status_user:"active", email : data.email, image_user: image[0].image_user
            })
            res.status(200).send({
                isError: false, 
                message: "success create",
                data: creatKasirr
            })

        } catch (error) {
            deleteFiles(req.files)
            next(error)
        }
    },

    updateKasir : async (req, res, next) => {
        try {
            // console.log("hemm");
            const data = JSON.parse(req.body.data)
            
            // get data user dengan menargetkan username
            const userCashier = await db.user.findByPk(data.id)
            console.log(data);
            
            const image = req.files.images.map(idx => {
                return {image_user: idx.path}
            })

            const editKasir = await db.user.update({
                ...userCashier, nama_lengkap : data.nama_lengkap, role : "cashier", username : data.username, password : data.password, status_user:"active", email : data.email, image_user: image[0].image_user
            })
            res.status(200).send({
                isError: false, 
                message: "success create",
                data: null
            })

        } catch (error) {
            deleteFiles(req.files)
            next(error)
        }
    },

    deleteStatus : async (req,res,next) => {
        try {
            const {id} = req.params
            const idStatuss = await db.user.findByPk(id)
            // console.log(idStatuss.dataValues.status_user)
            const data = {}
            if (idStatuss.dataValues.status_user === "active") {
                data["status"] = "Non-Active"
            } else {
                data["status"] = "active"
            }
            const updateStatusUser = await db.user.update(
                {
                    status_user : data.status
                },
                {
                    where : {id : id}
                }
            )
            res.status(200).send({
                isError : false,
                message : "Berhasil diubah",
                data : null
            })
        } catch (error) {
            next(error)
        }
    },

    getAllKasir : async (req, res, next) => {
        try {
            const respon = await db.user.findAll(
                {where : {role : "cashier"}}
            )
            
            res.status(200).send({
                isError : false,
                message : "Seluruh data kasir",
                data : respon
            })
        } catch (error) {
            deleteFiles(req.files)
            next(error)
            // console.log(error.message);
        }
    },
}
