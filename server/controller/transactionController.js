const db = require("./../models");

const {addToCart, productList} = require('./../services/transactionService')

module.exports = {
  addProductToCart: async (req, res, next) => {
    try {
        const {id} = req.params

        const product = await productList(id)
        const productAddToCart = await addToCart({product_name: product.dataValues.nama_produk, price: product.dataValues.harga, produk_id: id, user_id: 1, quantity: 1})

        console.log(productAddToCart);
    } catch (error) {
        next( error)
    }
  },
 
  
};
