const express = require('express')
const Router = express.Router()
const {categoryController} = require('../controller')


Router.post('/', categoryController.create)
Router.patch('/:id', categoryController.updateCategori)
Router.patch('/img/:idStatus', categoryController.updateStatus)

module.exports = Router