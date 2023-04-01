const jwt = require('jsonwebtoken')
const config = require('../config/config')


class tokenService {
    generateToken (payload){
        const refreshToken = jwt.sign(payload, config.db_path, {expiresIn:'30d'})
        return refreshToken
        
    }
}

module.exports = new tokenService()
