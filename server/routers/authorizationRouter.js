const express = require('express');
const Route = express.Router();
const {verify} = require('../lib/jwt')
const {authorizationController} = require('../controller')


Route.get('/forgetpassword',authorizationController.mailForgetPassword)
Route.put('/updatepassword',authorizationController.updatePassword)
Route.put('/resetpassword',verify, authorizationController.resetPassword)
module.exports = Route