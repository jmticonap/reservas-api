/* eslint-disable no-useless-catch */
const UserModel = require('../models/user.model')

const userService = {
  create: async user => {
    try {
      const newUser = await UserModel.create(user)

      return await UserModel.findByPk(newUser.id, {
        attributes: {
          exclude: ["password"]
        }
      })
    } catch (error) {
      throw (error)
    }
  },
  findAll: async () => {
    try {
      return await UserModel.findAll({
        attributes: {
          exclude: ["password"]
        }
      })
    } catch (error) {
      throw (error)
    }
  }
}

module.exports = userService