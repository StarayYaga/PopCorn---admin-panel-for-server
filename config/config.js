require('dotenv').config()

const env = process.env

module.exports = {
    "server_port": env.PORT,
    "db_path":env.local_db,
    'access_key':env.secret_access_key,
    'refresh_Key': env.secret_refresh_key
}