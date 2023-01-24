/* eslint-disable no-useless-catch */
const ClientModel = require('../models/client.model')

const clientService = {
  create: async client => {
    try {
      const newClient = await ClientModel.create(client)

      return newClient
    } catch (error) {
      throw (error)
    }
  },
  findAll: async () => {
    return await ClientModel.findAll()
  }
}

module.exports = clientService