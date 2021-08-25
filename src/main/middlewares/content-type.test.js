const supertest = require('supertest')

const app = require('../config/app')

const request = supertest(app)

describe('Content-Type Middleware', () => {
  it('Should return JSON content type as default', async () => {
    app.get('/test_content_type', (req, res) => res.send(''))

    await request
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
