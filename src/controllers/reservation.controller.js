const reservationService = require('../services/reservation.service')

const reservationController = {
  create: async (req, res, next) => {
    try {
      const reservation = await reservationService.create(
        req.body.reservation,
        req.user,
        req.body.client
      )
      res
        .status(200)
        .json(reservation)
    } catch (error) {
      next({
        status: 418,
        errorContent: error,
        message: "Problem creating new reservation"
      })
    }
  },
  findNextWeek: async (req, res, next) => {
    try {
      const reservations = await reservationService.findNextWeek()
      res
        .status(200)
        .json(reservations)
    } catch (error) {
      next({
        status: 418,
        errorContent: error,
        message: "Problem fetching next week reservations"
      })
    }
  },
  findNextWeekPendiente: async (req, res, next) => {
    try {
      const reservations = await reservationService.findNextWeekPendiente()
      res
        .status(200)
        .json(reservations)
    } catch (error) {
      next({
        status: 418,
        errorContent: error,
        message: "Problem fetching next week reservations"
      })
    }
  },
  payReservation: async (req, res, next) => {
    try {
      const id = req.body.id
      const pay = req.body.pay
      const reservation = await reservationService.payReservation(id, pay)
      res
        .status(200)
        .json(reservation)
    } catch (error) {
      next({
        status: 418,
        errorContent: error,
        message: "Problem making the resevation pay"
      })
    }
  }
}

module.exports = reservationController