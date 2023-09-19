const db = require("./../models");

module.exports = {
  addToCart: async (data) => {
    try {
        console.log(">>>",data);
        const addProduct =await db.cart.create(data)
        
        return addProduct
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
  cart: async () => {
    try {
        const cartProducts = await db.cart.findAll()

        return cartProducts
    } catch (error) {
        return error
    }
  }
};
