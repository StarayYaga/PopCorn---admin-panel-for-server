const express = require('express')
const controllerRouter = require('../controllers/contrallerRoute')
const router = express.Router()



router.use('/', express.static('frontEnd/title'))
router.use('/main', express.static('frontEnd/main'))
router.use('/login', express.static('frontEnd/login'))

router.post('/api/login', controllerRouter.login)
router.post('/api/logout', controllerRouter.logout)
router.post('/api/registration', controllerRouter.reg)
// router.post('/api/refresh', controllerRouter.refresh)
router.post('/api/check', controllerRouter.check)
router.post("/api/dataInfo", controllerRouter.getData)
router.post("/api/serviceControl", controllerRouter.setData)
router.post("/api/pushService", controllerRouter.pushService)
router.post("/api/deleteService", controllerRouter.deleteService)
router.get("/api/getService", controllerRouter.getServices)


module.exports = router
