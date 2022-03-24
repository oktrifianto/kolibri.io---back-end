const Product = require('../models/product.models')

const createOneProduct = async (req, res) => {
  try {
    const { name, price } = req.body
    if (!(name && price)) {
      res.status(409).json({
        "status" : res.statusCode,
        "message": "Failed, name and price is empty."
      })
      
    } else {
      await Product.create({
        name: name,
        price: price
      })
      
      res.status(201).json({
        "status" : res.statusCode,
        "message": "Product successfully created."
      })
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createOneProduct
}