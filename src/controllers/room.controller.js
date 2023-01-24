/* eslint-disable no-useless-catch */
const roomService = require('../services/room.service')

const roomController = {
  create: async (req, res, next) => {
    try {
      const room = await roomService.create(req.body)
      res
        .status(200)
        .json(room)
    } catch (error) {
      next({
        status: 418,
        errorContent: error,
        message: "Problem creating new room"
      })
    }
  },
  findAll: async (_req, res, next) => {
    try {
      const rooms = await roomService.findAll()
      res
        .status(200)
        .json(rooms)
    } catch (error) {
      next({
        status: 418,
        errorContent: error,
        message: "Error fetching rooms"
      })
    }
  }
}

module.exports = roomController