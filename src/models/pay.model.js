const db = require('../database/database')
const { DataTypes } = require('sequelize')

const PayModel = db.define('pay', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  method: {
    type: DataTypes.ENUM(['efectivo', 'transferencia']),
    defaultValue: 'transferencia',
    allowNull: false
  },
  quantity: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  operationNumber: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

module.exports = PayModel