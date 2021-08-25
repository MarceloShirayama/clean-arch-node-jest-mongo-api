const supertest = require('supertest')

const app = require('../config/app')

const request = supertest(app)

describe('JSON Parser Middleware', () => {
  it('Should parse body as JSON', async () => {
    app.post('/test_cors', (req, res) => res.send(req.body))

    await request
      .post('/test_cors')
      .send({ name: 'mango' })
      .expect({ name: 'mango' })
  })
})
