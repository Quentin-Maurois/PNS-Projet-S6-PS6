const { Router } = require('express')
const UserRouter = require('./users')
const StatsRouter = require('./stats')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/users', UserRouter)
router.use('/stats', StatsRouter)

module.exports = router
