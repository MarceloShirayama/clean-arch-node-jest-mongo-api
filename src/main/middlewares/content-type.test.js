const supertest = require('supertest')

describe('Content-Type Middleware', () => {
  let app, request

  beforeEach(() => {
    jest.resetModules()
    app = require('../config/app')
    request = supertest(app)
  })

  it('Should return JSON content type as default', async () => {
    app.get('/test_content_type', (req, res) => res.send(''))

    await request
      .get('/test_content_type')
      .expect('content-type', /json/)
  })

  it('Should return xml content type if forced', async () => {
    app.get('/test_content_type', (req, res) => res
      .type('xml')
      .send(''))

    await request
      .get('/test_content_type')
      .expect('content-type', /xml/)
  })
})
