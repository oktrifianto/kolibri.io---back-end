const User   = require('../models/user.models')
const { Op } = require('sequelize')

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
        "message" : "Input must required."
      })
    }

    const token = "ewg4gregjuadbnjabndjabd"
    
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
        password  : password,
        token     : token
      }
    }).then(([user, created]) => {
      if (created) {
        // create new data
        console.log('register success.')
        console.log(user)
      } else {
        // existed
        console.log('user is exist.')
      }
    })
    
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  signupNewUser
}