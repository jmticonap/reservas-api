const db = require('../database/database')
const { DataTypes } = require('sequelize')

const ClientModel = db.define('client', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  document: {
    type: DataTypes.STRING,
    allowNull: false
  },
  documentType: {
    type: DataTypes.ENUM(['dni', 'passport', 'driver_license']),
    defaultValue: 'dni',
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = ClientModel