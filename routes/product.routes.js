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
 */
router.delete('/:id', lib.removeSingleProduct)

/**
 * Update single product (all parameters)
 * @method    PUT
 * @path      /product/:id
 */
router.put('/:id', lib.updateSingleProduct)

module.exports = router