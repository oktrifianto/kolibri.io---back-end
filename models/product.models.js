const { Sequelize, DataTypes, Model } = require('sequelize') 
const db  = require('../config/db')

/**
 * @see https://sequelize.org/master/manual/model-basics.html#extending--a-href-----class-src-model-js-model-html--model--a-
 * @see https://github.com/sequelize/express-example/blob/master/express-main-example/sequelize/models/user.model.js
 */
const Product = db.define('Products', {
  id : {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER // can change sometime
  }
}, {
  tableName: 'product'
})
/*
class Product extends Model {}
Product.init({
  id : {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER // can change sometime
  }
}, {
  // db,
  modelName: 'Products',
  tableName: 'product' // table name in DB
})

*/

module.exports = Product