const db = require('../database/database')
const { DataTypes } = require('sequelize')

const RoomModel = db.define('room', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bedsQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = RoomModel