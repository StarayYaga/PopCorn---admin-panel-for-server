const express = require('express')
const controllerRouter = require('../controllers/contrallerRoute')
const router = express.Router()


// Front end routes
router.use('/', express.static('frontEnd/title'))
router.use('/main', express.static('frontEnd/main'))
router.use('/login', express.static('frontEnd/login'))


// Back end routes
router.post('/api/login', controllerRouter.login) // return { "refresh":token, "email": email, "data": Date.now() + 30*24*60*60*1000}
router.post('/api/logout', controllerRouter.logout) // return status code 200
router.post('/api/registration', controllerRouter.reg) // return json { "refresh":token, "email": email, "role": role, "data": Date.now() + 30*24*60*60*1000}
router.post('/api/check', controllerRouter.check) // return json true or false
router.post("/api/dataInfo", controllerRouter.getData) // return json {"uptime": uptime,"cpuTemp": cpuTemp.main,"cpuLoad": cpuLoad,"memTotal": memTotal.total/1024/1024/1024,"memUsed": memUsed.used/1024/1024/1024,"diskSize": diskSize[0].size/1024/1024/1024,"diskFree": diskFree.free/1024/1024/1024}
router.post("/api/serviceControl", controllerRouter.setData) // return json status of service
router.post("/api/pushService", controllerRouter.pushService)  // return status code 200
router.post("/api/deleteService", controllerRouter.deleteService) // return status code 200
router.get("/api/getService", controllerRouter.getServices)// return status code 200


module.exports = router
