const bcrypt = require('bcrypt')
const db = require('./dbFuncs')
const tokenService = require('./tokenControl')
const dataInfo = require('./controllers')


class userController {
    async registration (email, password, role){
        const candidate = await db.find_one(email)
        if (!candidate){
			throw new Error('Пользователь с такой ошибкой уже существует')
        }
		const hashPassword = await bcrypt.hash(password, 3)
		const token = tokenService.generateToken({"email": email})
		db.create_user(email, hashPassword, token)
		return (
            { "refresh":token, "email": email, "role": role, "data": Date.now() + 30*24*60*60*1000}
        )
    }

    async check(email, refresh){
        const result = await db.getToken(email)
        if (refresh == result){
            return true
        }
        return false
    }

    async login(email, password){
        const dbPassword = await (await db.getHash(email))
        const hashPassword = await bcrypt.compare(password, dbPassword)
        if (hashPassword){
            const token = tokenService.generateToken({"email": email})
            db.update_token_user(email, token)
            return (
                { "refresh":token, "email": email, "data": Date.now() + 30*24*60*60*1000}
            )
        }
    }

    async logout(email){
        db.update_token_user(email, 'logout')
    }
    
    async getData (){
        return await dataInfo.getInfo()
    }
    async setData(data){
        const info = await dataInfo.setInfo(data.obj)
        return info
    }
    async pushService(name){
        await db.pushService(name)
    }

    async deleteService(name){
        await db.deleteService(name)
    }
    async getServices(name){
        const result = []
        const dbresult = await db.getServices()
        for (let item of dbresult){
            const status =  await dataInfo.setInfo(item.name)
            result.push({"name": item.name, "status": status})
        }
        return result
    }
}

module.exports = new userController()
