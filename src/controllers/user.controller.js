const userService = require('../services/user.service')

const userController = {
    create: async (req, res, next) => {
        try {
            const user = await userService.create(req.body)
            res
                .status(200)
                .json(user)
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: "Problem creating new user."
            })
        }
    },
    findAll: async (_req, res, next) => {
        try {
            const users = await userService.findAll()
            res
                .status(200)
                .json(users)
        } catch (error) {
            next({
                status: 418,
                errorContent: error,
                message: "Error fetching users."
            })
        }

    }
}

module.exports = userController