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

/**
 * SignUp new user
 * @method    POST 
 * @path      /user/signup
 * @requires  {json body} -> email, password, username
 */
router.post('/signup', lib.signupNewUser)

/**
 * Login User
 * @method    POST 
 * @path      /user/login
 * @requires  {json body} -> email, password
 */
router.post('/login', lib.loginUser)

module.exports = router