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
  findFreeRoomsBetween: async (req, res, next) => {
    try {
      const since = req.body.since
      const until = req.body.until
      const rooms = await reservationService.findFreeRoomsBetween(since, until)
      res
        .status(200)
        .json(rooms)
    } catch (error) {
      next({
        status: 418,
        errorContent: error,
        message: "Problem fetching free rooms"
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
  },
  setEliminadoReservation: async (req, res, next) => {
    try {
      const { id } = req.params
      const count = await reservationService.setEliminadoReservation(id)
      res
        .status(200)
        .json({ count })
    } catch (error) {
      next({
        status: 418,
        errorContent: error,
        message: 'We can\'t set status as "eliminado"'
      })
    }
  }
}

module.exports = reservationController
