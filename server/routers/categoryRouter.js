const express = require('express')
const Router = express.Router()
const {categoryController} = require('../controller')

Router.post('/', categoryController.create)

module.exports = Router