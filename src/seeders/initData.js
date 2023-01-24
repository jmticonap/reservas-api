
const UserModel = require('../models/user.model')
const ClientModel = require('../models/client.model')
const RoomModel = require('../models/room.model')

const users = require('./users')
const clients = require('./clients')
const rooms = require('./rooms')

const initData = async db => {
  const t = await db.transaction()

  await UserModel.bulkCreate(users, { transaction: t })
  await ClientModel.bulkCreate(clients, { transaction: t })
  await RoomModel.bulkCreate(rooms, { transaction: t })

  await t.commit()
}

module.exports = initData