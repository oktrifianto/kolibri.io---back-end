const { Sequelize, DataTypes } = require('sequelize') 
const db  = require('../config/db')

const User = db.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
})

module.exports = User