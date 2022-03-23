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

/**
 * Get one user by username
 * @method   GET
 * @path     /user/:username
 */
router.get('/:username', lib.getUserByUsername)

module.exports = router