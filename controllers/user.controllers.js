const User   = require('../models/user.models')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
const isEmailValid = require('../services/EmailValidator')
const isUserValid  = require('../services/UsernameValidator')

/**
 * Controller for get all users
 * @path  /user/all
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.json({
      "status"  : res.statusCode,
      "message" : users
    })
  } catch (err) {
    console.log(err)
  }
}

/**
 * Controller for get user by username
 * @path  /user/:username
 * @see   https://sequelize.org/master/manual/model-querying-finders.html#-code-findone--code-
 */
const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params
    const userData = await User.findOne({
      attributes: [
        'id',
        'username'
      ], // SELECT id, username FROM ...
      where: {
        username: `${username}`
      } // WHERE username="" ...
    })

    if (userData == null){
      res.status(404).json({
        "status"  : res.statusCode,
        "message" : "Username not found"
      })
    } else {
      res.status(200).json({
        "status"  : res.statusCode,
        "message" : userData
      })
    }
  } catch (err) {
    console.log(err)
  }
}

/**
 * Controller for signup new user
 * @path  /user/signup
 * @see   [findOrCreate]  --- https://sequelize.org/master/manual/model-querying-finders.html#-code-findorcreate--code-
 * @see   [Op]            --- https://sequelize.org/master/manual/model-querying-basics.html#operators
 */
const signupNewUser = async (req, res) => {
  try {
    const { email, username, password } = req.body

    if (!(email && username && password)){
      res.status(400).json({
        status  : res.statusCode,
        message : "Input must required."
      })
    }

    // Check email is valid
    if (!(isEmailValid(email))){
      res.status(401).json({
        status  : res.statusCode,
        message : "Your email not valid."
      })
    // Check username is valid
    } else if (!isUserValid(username)){
      res.status(401).json({
        status  : res.statusCode,
        message : "Your username is not valid. Must use 8-20 characters long."
      })
    } else {

      const token         = jwt.sign({email : email}, process.env.TOKEN_KEY, {expiresIn: '2h'})
      const passwordHash  = await bcrypt.hash(password, 10)
      
      await User.findOrCreate({
        where: {
          [Op.or] : [
            { email : email }, 
            { username : username }
          ]
        },
        defaults: {
          email     : email,
          username  : username,
          password  : passwordHash,
          token     : token
        }
      }).then(([user, created]) => {
        if (created) {
          res.status(201).json({
            status  : res.statusCode,
            message : "Register success.",
            data    : {
              email   : user.email,
              username: user.username,
              token   : user.token
            }
          })
        } else {
          res.status(409).json({
            status  : res.statusCode,
            message : "Sorry, user is existed." 
          })
        }
      })
    }
    
  } catch (err) {
    // console.log(err)
  }
}

/**
 * Controller for login user
 * @path      /user/login
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(400).json({
        status  : res.statusCode,
        message : 'All input should be required.'
      })
    }

    const user = await User.findOne({
      where: {
        email: email
      }
    })

    // check email exist & compare password
    if (user != null) {
      if (!(await bcrypt.compare(password, user.password))){
        res.status(401).json({
          status  : res.statusCode,
          message : 'Unauthorized, your password is wrong.' 
        })
      } else { // password is true
        const token = jwt.sign({email}, process.env.TOKEN_KEY, {expiresIn: "2h"})
      
        // update token value
        user.token = token
        await user.save()

        res.status(200).json({
          status  : res.statusCode,
          message : 'Login Success.',
          data    : {
            username : user.username,
            token    : user.token
          }
        })

      }
    } else {
      res.status(404).json({
        status  : res.statusCode,
        message : 'User is not exist.'
      })
    }

  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  signupNewUser,
  loginUser
}