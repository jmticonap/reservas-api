/* eslint-disable no-useless-catch */
const RoomModel = require('../models/room.model')

const roomService = {
  create : async room => {
    try {
      const newRoom = await RoomModel.create(room)

      return newRoom
    } catch (error) {
      throw(error)
    }
  },
  findAll: async () => {
    try {
      return await RoomModel.findAll()
    } catch (error) {
      throw(error)
    }
  },
  findByName: async name => {
    try {
      return await RoomModel.findOne({
        where: { name }
      })
    } catch (error) {
      throw(error)
    }
  }
}

module.exports = roomService