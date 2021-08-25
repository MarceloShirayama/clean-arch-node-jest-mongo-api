const supertest = require('supertest')

const app = require('./app')

const request = supertest(app)

describe('App Setup', () => {
  it('Should disable x-powered-by header', async () => {
    app.get('/test_x_powered_by', (req, res) => res.send(''))

    const res = await request.get('/test_x_powered_by')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})
