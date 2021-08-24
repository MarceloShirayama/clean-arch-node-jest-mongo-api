const { MongoClient } = require('mongodb')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let client, db

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
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const user = await sut.load('valid_email@mail.com')
    expect(user._id).toEqual(fakeUser.insertedId)
    expect(user.password).toEqual('hashed_password')
  })
})
