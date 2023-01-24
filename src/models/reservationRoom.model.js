const db = require('../database/database')
const { DataTypes } = require('sequelize')

const ReservationRoomModel = db.define('reservation_room', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
},{
  timestamps: false
})

module.exports = ReservationRoomModel