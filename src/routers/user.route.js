const { Router } = require('express')
const userController = require('../controllers/user.controller')

const router = Router()


router.get('/user', userController.findAll)
router.post('/user', userController.create)

module.exports = router
