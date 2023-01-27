const { Router } = require('express')
const reservationController = require('../controllers/reservation.controller')

const router = Router()

router.get('/reservation', reservationController.findNextWeek)
router.get('/reservation/pendiente', reservationController.findNextWeekPendiente)
router.post('/reservation', reservationController.create)
router.post('/reservation/pay', reservationController.payReservation)
router.post('/reservation/freerooms', reservationController.findFreeRoomsBetween)
router.get('/reservation/:id', reservationController.setEliminadoReservation)

module.exports = router
