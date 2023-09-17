const express = require('express')
const Router = express.Router()

const {productController} = require('../controller')

Router.post('/', productController.create)

module.exports = Router