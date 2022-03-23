const { Sequelize } = require('sequelize')  // v6 - stable
require('dotenv').config()

const db = new Sequelize(
  process.env.MYSQL_DBNAME,
  process.env.MYSQL_DBUSER,
  process.env.MYSQL_DBPASSWORD,
  {
    logging: false, // disable console when access DB
    host: process.env.MYSQL_DBHOST,
    dialect: 'mysql'
  }
)

module.exports = db // export db connection