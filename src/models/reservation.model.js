const db = require('../database/database')
const { DataTypes } = require('sequelize')

const ReservationModel = db.define('reservation', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  state: {
    type: DataTypes.ENUM(['eliminado','pagado', 'pendiente']),
    defaultValue: 'pendiente',
    allowNull: false
  },
  dateCheckIn: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  dateCheckOut: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
})

module.exports = ReservationModel