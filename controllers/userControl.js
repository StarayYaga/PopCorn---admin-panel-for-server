const bcrypt = require('bcrypt')
const db = require('./dbFuncs')
const tokenService = require('./tokenControl')
const dataInfo = require('./controllers')


class userController {
    async registration (email, password, role){ // регистрация 
        const candidate = await db.find_one(email) //поиск почты в бд. Если нашли, то выбрасываем ошибку о существующим пользователе
        if (!candidate){
			throw new Error('Пользователь с такой ошибкой уже существует')
        }
		const hashPassword = await bcrypt.hash(password, 3)  // шифрование пароля
		const token = tokenService.generateToken({"email": email})  // генерация токена
		db.create_user(email, hashPassword, token)  // создание записи в бд
		return (
            { "refresh":token, "email": email, "role": role, "data": Date.now() + 30*24*60*60*1000}
        )
    }

    async check(email, refresh){  // проверка авторизации пользователя
        const result = await db.getToken(email)  // запрашиваем из бд токен по почте
        if (refresh == result){  // сравниваем
            return true
        }
        return false
    }

    async login(email, password){ // авторизация 
        const dbPassword = await (await db.getHash(email)) // запрашиваем захешированный пароль по почте
        const hashPassword = await bcrypt.compare(password, dbPassword) // сравниваем их
        if (hashPassword){
            const token = tokenService.generateToken({"email": email}) // генерация нового токена
            db.update_token_user(email, token) // изменяем токен в бд
            return (
                { "refresh":token, "email": email, "data": Date.now() + 30*24*60*60*1000}
            )
        }
    }

    async logout(email){
        db.update_token_user(email, 'logout') // удаление токена из бд
    }
    
    async getData (){
        return await dataInfo.getInfo() // получение информации о системе
    }

    async setData(data){
        const info = await dataInfo.setInfo(data.obj) // получение информации о сервисах
        return info
    }

    async pushService(name){
        await db.pushService(name) // добавить сервис в мониторинг
    }

    async deleteService(name){
        await db.deleteService(name) // удалить сервис из мониторинга
    }
    async getServices(name){
        const result = []
        const dbresult = await db.getServices() // запрашиваем сервисы из бд
        for (let item of dbresult){
            const status =  await dataInfo.setInfo(item.name) // получаем статус сервиса 
            result.push({"name": item.name, "status": status})
        }
        return result
    }
}

module.exports = new userController()
