const clientService = require('../services/client.service')

const clientController = {
  create: async (req, res, next) => {
    try {
      const client = await clientService.create(req.body)
      res
        .status(200)
        .json(client)
    } catch (error) {
      next({
        status: 418,
        errorContent: error,
        message: "Problem creating new client"
    })
    }
  },
  findAll: async (_req, res, next) => {
    try {
      const clients = await clientService.findAll()
      res
        .status(200)
        .json(clients)
    } catch (error) {
      next({
        status: 418,
        errorContent: error,
        message: "Error fetching clients"
    })
    }
  }
}

module.exports = clientController