const { Sequelize } = require('sequelize')  // v6 - stable
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.MYSQL_DBNAME,
  process.env.MYSQL_DBUSER,
  process.env.MYSQL_DBPASSWORD,
  {
    host: process.env.MYSQL_DBHOST,
    dialect: 'mysql'
  }
)

module.exports = sequelize