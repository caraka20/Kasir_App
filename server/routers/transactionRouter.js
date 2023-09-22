const express = require("express");

const Router = express.Router();
const {verify} = require('./../lib/jwt')
const transactionController = require("./../controller/transactionController");

Router.post("/cashier", verify,  transactionController.addProductToCart);


Router.post("/transaction", transactionController.confirm);


Router.get("/products", transactionController.productList);


Router.get("/cart", transactionController.cart);


Router.post("/confirm-order", transactionController.confirmOrder);


Router.post("/total-price", transactionController.total_price);


Router.post("/receipt", transactionController.getReceiptByIdTransaction);






module.exports = Router