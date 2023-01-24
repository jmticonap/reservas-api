const { Router } = require('express')
const roomController = require('../controllers/room.controller')

const router = Router()

router.get('/room', roomController.findAll)
router.post('/room', roomController.create)

module.exports = router
