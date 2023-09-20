const db = require("../models")
const {deleteFiles} = require('../helper/deleteFiles')

module.exports = {
    createKasir : async (req, res, next) => {
        try {
            const dataKasir = JSON.parse(req.files.data)
            console.log(dataKasir);

        } catch (error) {
            next(error)
        }
    }
}


