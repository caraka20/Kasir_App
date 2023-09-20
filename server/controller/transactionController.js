const db = require("./../models");

const {
  addToCart,
  productList,
  cart,
} = require("./../services/transactionService");


module.exports = {
  addProductToCart: async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await productList(id);

      const cartss = await cart();

      const filtered = cartss.filter((value) => {
        return value.dataValues.produk_id == product.dataValues.id;
      });

      
      if (filtered.length > 0) {
        throw { message: "Product has already exist on cart" };
      } else {
        const productAddToCart = await addToCart({
          product_name: product.dataValues.nama_produk,
          price: product.dataValues.harga,
          produk_id: id,
          user_id: 1,
          quantity: 1,
        });

        res.status(200).send({
          isError: false,
          message: "Added to Cart Success",
          data: productAddToCart,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
