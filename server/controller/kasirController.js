const db = require("../models")
const {sequelize} = require("../models")

module.exports = {
    createKasir : async (req, res, next) => {
        try {
            const {email, username, nama_lengkap, password} = req.body
        } catch (error) {
            next(error)
        }
    }
}
