const db = require("./../models");

module.exports = {
  addToCart: async (data) => {
    try {
      console.log(">>>", data);
      const addProduct = await db.cart.create(data);

      return addProduct;
    } catch (error) {
      return error;
    }
  },
  productList: async (id) => {
    console.log(id);
    try {
      const products = await db.produk.findOne({ where: { id: id } });

      return products;
    } catch (error) {
      return error;
    }
  },
  cart: async () => {
    try {
      const cartProducts = await db.cart.findAll({
        include: [
          {
            model: db.produk,
            attributes: ["nama_produk", "harga", "stock"],
            include: [
              {
                model: db.kategori_produk,
                attributes: ["nama_kategori"],
              },
            ],
          },
        ],
      });

      return cartProducts;
    } catch (error) {
      return error;
    }
  },
  cartToTransaction: async (data) => {
    try {
      const sendCart = await db.transaction.bulkCreate(data);

      return sendCart;
    } catch (error) {
      return error;
    }
  },
  transaction: async(data) => {
    try {
      const transaction = await db.transaction.findAll()

      return transaction
    } catch (error) {
      return error
    }
  }
};
