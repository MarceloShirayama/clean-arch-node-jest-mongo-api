const request = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../config/app')
const MongoHelper = require('../../infra/helpers/mongo-helper')

let collection

describe('Login Routes', () => {
  beforeAll(async () => {
    const url = process.env.MONGO_URL
    await MongoHelper.connect(url)
  })

  beforeEach(async () => {
    collection = await MongoHelper.getCollection('users')
    await collection.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should return 200 when valid credentials are provided', async () => {
    await collection.insertOne({
      email: 'valid_email@mail.com',
      password: bcrypt.hashSync('hashed_password', 10)
    })
    await request(app)
      .post('/api/login')
      .send({
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      })
      .expect(200)
  })
})
