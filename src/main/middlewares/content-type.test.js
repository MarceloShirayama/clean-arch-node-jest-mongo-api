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

  it('Should return xml content type if forced', async () => {
    app.get('/test_content_type_xml', (req, res) => res
      .type('xml')
      .send(''))

    await request
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
