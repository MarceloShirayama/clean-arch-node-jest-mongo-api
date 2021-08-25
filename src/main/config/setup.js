const cors = require('../middlewares/cors')
const JsonParse = require('../middlewares/json-parse')
const contentType = require('../middlewares/content-type')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(JsonParse)
  app.use(contentType)
}
