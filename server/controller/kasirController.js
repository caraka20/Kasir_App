const db = require("../models")
const {sequelize} = require("../models")

module.exports = {
    createKasir : async (req, res, next) => {
        try {
            // const input = req.body.data
            const data = db.produk.findAll()
            console.log(JSON.parse(req.body.data));
        } catch (error) {
            next(error)
        }
    }
}


