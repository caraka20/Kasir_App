const express = require('express')
const Router = express.Router()
const {filterController} = require('../controller')

Router.get('/A-Z', filterController.filterAbjadAZ)
Router.get('/Z-A', filterController.filterAbjadZA)
Router.get('/L-H', filterController.filterHargaHL)
Router.get('/H-L', filterController.filterHargaLH)
Router.get('/kategori', filterController.filterCategory)
module.exports = Router