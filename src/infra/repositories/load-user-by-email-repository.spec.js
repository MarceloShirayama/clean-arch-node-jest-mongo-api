const { MongoClient } = require('mongodb')
class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne({ email })
    return user
  }
}

describe('Load User by Email Repository', () => {
  let client, db

  beforeAll(async () => {
    const url = process.env.MONGO_URL
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    client = await MongoClient.connect(url, options)
    db = client.db()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await client.close()
  })
  it('Should return undefined if user is not found', async () => {
    const userModel = db.collection('users')
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeUndefined()
  })

  it('Should return user if user is found', async () => {
    const userModel = db.collection('users')
    await userModel.insertOne({ email: 'valid_email@mail.com' })
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('valid_email@mail.com')
    expect(user.email).toBe('valid_email@mail.com')
  })
})
