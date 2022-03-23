const express = require('express')
const router  = express.Router()

// import controllers
const lib     = require('../controllers/user.controllers')

/**
 * Get all users
 * @method   GET 
 * @path     /user/all
 */
router.get('/all', lib.getAllUsers)

module.exports = router