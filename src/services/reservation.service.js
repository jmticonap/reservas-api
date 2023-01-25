/* eslint-disable no-useless-catch */
const ReservationModel = require('../models/reservation.model')
const ReservationRoomModel = require('../models/reservationRoom.model')
const PayModel = require('../models/pay.model')
const db = require('../database/database')
const { Op } = require('sequelize')
const RoomModel = require('../models/room.model')

const includePayModel = {
  model: PayModel,
  as: 'pay'
}
const includeReservationRoomModel = [
  { model: ReservationModel, as: 'reservation' },
  { model: RoomModel, as: 'room' }
]

const reservationService = {
  create: async (reservation, user, client) => {
    try {
      const t = await db.transaction()
      const rooms = [...reservation.rooms]
      delete reservation.rooms
      
      const newReservation = await ReservationModel
        .create(
          {
            ...reservation,
            user_id: user.id,
            client_id: client.id
          },
          {
            include: includePayModel,
            transaction: t
          }
        )
      await newReservation.save()

      const bulkRooms = rooms.map(room => ({
        reservationId: newReservation.id,
        roomId: room
      }))
      await ReservationRoomModel.bulkCreate(bulkRooms, {
        include: includeReservationRoomModel,
        transaction: t
      })

      await t.commit()


      return await ReservationModel.findByPk(newReservation.id, {
        include: [
          includePayModel,
          {
            model: RoomModel,
            as: 'reservationRoom'
          }
        ]
      })
    } catch (error) {
      throw (error)
    }
  },
  bulkCreate: async (reservations, user, client) => {
    const newReservations = reservations.map(async reservation => {
      return await reservationService.create(reservation, user, client)
    })

    return newReservations
  },
  findNextWeek: async () => {
    try {
      const nextWeek = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))

      const reservations = await ReservationModel.findAll({
        where: {
          [Op.and]: [
            { dateCheckIn: { [Op.gte]: new Date() } },
            { dateCheckIn: { [Op.lte]: nextWeek } }
          ]
        },
        include: [
          {
            model: PayModel,
            as: 'pay',
            attributes: {
              exclude: ['reservation_id']
            }
          },
          {
            model: RoomModel,
            as: 'reservationRoom'
          }
        ]
      })

      return reservations
    } catch (error) {
      throw (error)
    }
  },
  findNextWeekPendiente: async () => {
    try {
      const nextWeek = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))

      const reservations = await ReservationModel.findAll({
        where: {
          [Op.and]: [
            { dateCheckIn: { [Op.gte]: new Date() } },
            { dateCheckIn: { [Op.lte]: nextWeek } },
            { state: { [Op.eq]: 'pendiente' } }
          ]
        },
        include: [
          {
            model: PayModel,
            as: 'pay',
            attributes: {
              exclude: ['reservation_id']
            }
          },
          {
            model: RoomModel,
            as: 'reservationRoom'
          }
        ]
      })

      return reservations
    } catch (error) {
      throw (error)
    }
  },
  payReservation: async (id, pay) => {
    try {
      const t = await db.transaction()
      const reservation = await ReservationModel.findOne({
        where: { id },
        include: {
          model: PayModel,
          as: 'pay',
          attributes: {
            exclude: ['reservation_id']
          }
        },
        transaction: t
      })

      await reservation.update({ state: 'pagado' }, { transaction: t })
      await reservation.pay.update(pay, { transaction: t })
      await reservation.save()

      await t.commit()

      return reservation
    } catch (error) {
      throw (error)
    }
  }
}

module.exports = reservationService
