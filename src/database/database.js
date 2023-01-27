const { Sequelize } = require('sequelize')
process.env.NODE_ENV !== 'pro' && require('dotenv').config()

const db = new Sequelize(
  process.env.NODE_ENV === 'pro'
    ? process.env.PRO_DB_URI
    : process.env.DEV_DB_URI,
  {
    logging: false,
    dialectOptions: process.env.NODE_ENV === 'pro' && { ssl: { require: true, rejectUnauthorized: false } }
  }
)

module.exports = db