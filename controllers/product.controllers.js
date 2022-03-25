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

/**
 * Controller for get all products
 * @path  /product/all
 */
 const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll()

    if (products.length > 0)
      res.status(200).json({
        status  : res.statusCode,
        data    : products
      })
    else
      res.status(404).json({
        status  : res.statusCode,
        message : "No product here."
      })

  } catch (err) {
    console.log(err)
  }
}

/**
 * Controller for get single product
 * @path  /product/:id
 */
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({
      where: {
        id: id
      }
    })

    if (product == null) {
      res.status(404).json({
        "status"  : res.statusCode,
        "message" : "Product not found."
      })
    } else {
      res.status(200).json({
        "status"  : res.statusCode,
        "message" : product
      })
    }

  } catch (err) {
    console.log(err)
  }
}

/**
 * Controller for delete single product
 * @path  /product/:id
 */
const removeSingleProduct = async (req, res) => {
  try {
    const { id } = req.params
    await Product.destroy({
      where: {
        id : id
      }
    }).then((removeRecord) => {
      if (removeRecord == 1) {
        res.status(202).json({ // if 204 not return any content
          status  : res.statusCode,
          message : "Product successfully deleted."
        })
      } else {
        res.status(404).json({
          status  : res.statusCode,
          message : "Product not found."
        })
      }
    }).catch((err) => {
      res.status(500).json(err)
    }).finally(() => {
      // nothing here
      // for disable error [ERR_HTTP_HEADERS_SENT]
    })

  } catch (err) {
    console.log(err)
  }
}

/**
 * Controller for update single product
 * @path  /product/:id
 * @see   https://www.thoughtco.com/javascript-by-example-use-of-the-ternary-operator-2037394
 */
const updateSingleProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, price } = req.body

    if (!(name && price)) {

      const v = (!name) ? "Product name" : "Product price"
      res.status(409).json({
        status: res.statusCode,
        message: `${v} must not empty!`
      })
      
    } else {

      await Product.update({ name: name, price: price}, {
        where: {
          id : id
        }
      })
      
      const result = await Product.findByPk(id)

      res.status(202).json({
        status  : res.statusCode,
        message : "Product sucessfully updated.",
        data    : result
      })

    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createOneProduct,
  getSingleProduct,
  removeSingleProduct,
  updateSingleProduct,
  getAllProducts
}