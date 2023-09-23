const express = require('express')
const Router = express.Router()
const {categoryController} = require('../controller')

Router.get('/', categoryController.getData)
Router.post('/', categoryController.create)
Router.patch('/:id', categoryController.updateCategori)
Router.patch('/img/:idStatus', categoryController.updateStatus)

module.exports = Router