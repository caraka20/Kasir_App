const express = require('express')
const Router = express.Router()

const {productController} = require('../controller')
const upload = require('../middleware/upload')


Router.get('/', productController.getData)
<<<<<<< HEAD
Router.get('/:id', productController.getById)
=======

>>>>>>> aae8b077733bd0834ce146e072352bf5e5f0d4ac
Router.post('/', upload, productController.create)
Router.put('/:id', productController.update)
Router.patch('/:id', productController.deleteStatus)
Router.patch('/img/:idProduk', upload, productController.updateImageProduk)

module.exports = Router