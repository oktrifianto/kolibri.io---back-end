const express = require('express')
const router  = express.Router()
const lib     = require('../controllers/product.controllers')

/**
 * Create one single product
 * @method    POST
 * @path      /product
 * @requires  {json} -> body: name, price
 */
router.post('/', lib.createOneProduct)

module.exports = router