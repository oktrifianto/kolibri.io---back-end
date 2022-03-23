const User = require('../models/user.models')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      "status"  : res.statusCode,
      "message" : users
    })
  } catch (error) {
    console.log(error)
  }
}

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
module.exports = {
  getAllUsers,
  getUserByUsername
}