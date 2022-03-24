const { Sequelize, DataTypes } = require('sequelize') 
const db  = require('../config/db')

/**
 * How to define model?
 * sequelize.define('name', {attributes}, {options})
 * db.define('name', {attributes}, {options})
 * @see https://github.com/sequelize/express-example/blob/master/express-main-example/sequelize/models/user.model.js
 */
const User = db.define('Users', { // `Users` is [model name]
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  // freezeTableName: true, // Model tableName will be the same as the model name 
  tableName: 'user' // tell table name directly in db
})

module.exports = User