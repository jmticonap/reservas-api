/* eslint-disable no-useless-catch */
const ReservationModel = require('../models/reservation.model')
const PayModel = require('../models/pay.model')

const payService = {
  create: async (reservationId, pay) => {
    try {
      const reservation = ReservationModel.findByPk(reservationId)
      reservation['pay'] = pay

      await ReservationModel.update(reservation, {
        include: [
          {
            model: PayModel,
            as: "pay"
          }
        ]
      })

      return reservation
    } catch (error) {
      throw (error)
    }
  }
}

module.exports = payService