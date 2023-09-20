const express = require("express")
const Route = express.Router()
const {reportController} = require("../controller")

Route.get("/", reportController.allTransaction)
Route.get("/tanggal", reportController.transaksiPerTanggal)
Route.get("/:uid", reportController.detailTransaction)

module.exports = Route