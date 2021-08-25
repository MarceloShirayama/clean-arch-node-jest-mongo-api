const supertest = require('supertest')

const app = require('../config/app')

const request = supertest(app)

describe('Cors Middleware', () => {
  it('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => res.send(''))

    const res = await request.get('/test_cors')
    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
