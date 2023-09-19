const express = require("express")
const Router = express.Router()
const {kasirController} = require("../controller")

Router.post("/", kasirController.createKasir)

module.exports = Router