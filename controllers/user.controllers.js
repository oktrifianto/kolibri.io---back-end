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

module.exports = {
  getAllUsers
}