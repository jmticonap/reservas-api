
const UserModel = require('../models/user.model')
const ClientModel = require('../models/client.model')

const users = require('./users')
const clients = require('./clients')

const initData = async db => {
  const t = await db.transaction()

  await UserModel.bulkCreate(users, { transaction: t })
  await ClientModel.bulkCreate(clients, { transaction: t })

  await t.commit()
}

module.exports = initData