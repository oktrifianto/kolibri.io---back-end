const express = require('express')
const router  = express.Router()
const lib     = require('../controllers/product.controllers')
const auth    = require('../middleware/auth')

/**
 * Create one single product
 * @method    POST
 * @path      /product
 * @requires  {json} -> body: name, price
 * @protected
 */
router.post('/', auth, lib.createOneProduct)

/**
 * Get all products
 * @method    GET
 * @path      /product/all
 */
 router.get('/all', lib.getAllProducts)

/**
 * Get single product
 * @method    GET
 * @path      /product/:id
 */
router.get('/:id', lib.getSingleProduct)

/**
 * Delete single product
 * @method    DELETE
 * @path      /product/:id
 * @protected
 */
router.delete('/:id', auth, lib.removeSingleProduct)

/**
 * Update single product (all parameters)
 * @method    PUT
 * @path      /product/:id
 * @protected
 */
router.put('/:id', auth, lib.updateSingleProduct)

module.exports = router