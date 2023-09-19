const express = require('express');
const Route = express.Router();
const {authorizationController} = require('../controller')


Route.get('/forgetpassword',authorizationController.mailForgetPassword)
Route.put('/updatepassword',authorizationController.updatePassword)
Route.put('/resetpassword/:id',authorizationController.resetPassword)
module.exports = Route