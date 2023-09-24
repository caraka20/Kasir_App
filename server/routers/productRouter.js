const express = require('express')
const Router = express.Router()

const {productController} = require('../controller')
const upload = require('../middleware/upload')



Router.post('/', upload, productController.create)
Router.put('/:id', productController.update)
Router.patch('/:id', productController.deleteStatus)
Router.patch('/img/:idProduk', upload, productController.updateImageProduk)

module.exports = Router
