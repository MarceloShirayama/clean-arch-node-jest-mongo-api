require('dotenv/config')

const mongoHost = process.env.MONGO_HOST || 'localhost'
const mongoPort = process.env.MONGO_PORT || 27017
const mongoDb = process.env.MONGO_DB || 'clean-node-api'
const mongoUser = process.env.MONGO_USER || 'clean-node-api-user'
const mongoPass = process.env.MONGO_PASS || 'clean-node-api-user'
const mongoUrl = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDb}`
const tokenSecret = process.env.TOKEN_SECRET || 'secret_key'
const serverPort = process.env.SERVER_PORT || 5858
const serverHost = process.env.SERVER_HOST || 'localhost'

module.exports = {
  mongoUrl,
  tokenSecret,
  serverPort,
  serverHost
}
