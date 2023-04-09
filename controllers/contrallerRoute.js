const config = require('../config/config').db_pathi
// const { deleteService } = require('./dbFuncs');
const userService = require('./userControl')


class controlRouter {
    async reg(req, res, next){
        try{
			const {email, password} = req.body;
			const userData = await userService.registration(email, password)
			return res.json(userData)
        } catch (e){
            res.end()
            console.log(e);
        }
    }

    async login(req, res, next){
        try{
            const {email, password} = req.body;
            const userData = await userService.login(email, password)
            if (userData){
    			return res.json(userData)
            }
        } catch (e){
        }
    }

    async logout(req, res, next){
        try{
            const email = req.body
            await userService.logout(email)
            res.sendStatus(200)
        } catch (e){
            console.log(e);
            res.sendStatus(200)
        }
    }

    async check(req, res, next){
        try{
            const {email, access, refresh} = req.body
            const userData = await userService.check(email, access, refresh)
            return res.json(userData)
        } catch (e){
            // console.log(e);
        }
    }

    async getData(req, res, next){
        try {
            return await res.json(
                   await userService.getData()
                )
        } catch (error) {
            
        }
    }
    async setData(req, res,next){
        const data = await userService.setData(req.body)
        return res.json(data)
    }

    async pushService(req,res,next){
        const data = await userService.pushService(req.body.name)
        return res.sendStatus(200)
    }

    async deleteService(req, res,next){
        const data = await userService.deleteService(req.body.name)
        return res.sendStatus(200)
    }

    async getServices(req, res,next){
        const data = await userService.getServices()
        return res.json(data)
    }
}

module.exports = new controlRouter()
