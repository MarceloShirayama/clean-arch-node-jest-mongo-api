const { MongoClient } = require('mongodb')

let client, db
class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne({ email })
    return user
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('Load User by Email Repository', () => {
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
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeUndefined()
  })

  it('Should return user if user is found', async () => {
    const { sut, userModel } = makeSut()
    await userModel.insertOne({ email: 'valid_email@mail.com' })
    const user = await sut.load('valid_email@mail.com')
    expect(user.email).toBe('valid_email@mail.com')
  })
})
