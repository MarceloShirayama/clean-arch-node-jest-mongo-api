const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app')
    const { serverPort, serverHost } = env
    const serverUrl = `http://${serverHost}:${serverPort}`
    app.listen(serverPort, serverHost, () => (
      console.log(`listen on: ${serverUrl}`
      )))
  })
  .catch(console.error)
