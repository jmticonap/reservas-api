const { Router } = require('express')
const clientController = require('../controllers/client.controller')

const router = Router()

router.get('/client', clientController.findAll)
router.post('/client', clientController.create)

module.exports = router
