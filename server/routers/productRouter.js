const express = require('express')
const Router = express.Router()

const {productController} = require('../controller')

Router.post('/', productController.create)
Router.put('/:id', productController.update)
Router.patch('/:id', productController.deleteStatus)

module.exports = Router