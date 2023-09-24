const db = require("./../models");

module.exports = {
  addToCart: async (data) => {
    try {
        const addProduct = db.cart.create(...data)
    } catch (error) {
        return error
    }
  },
  productList: async (id) => {
    try {
      const products = await db.produk.findOne({where: {id: id}});

        return products
    } catch (error) {
      return error;
    }
  },
};
