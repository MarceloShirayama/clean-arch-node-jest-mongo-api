const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let collection

const makeSut = () => {
  return new LoadUserByEmailRepository()
}

describe('Load User by Email Repository', () => {
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
  it('Should return undefined if user is not found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeUndefined()
  })

  it('Should return user if user is found', async () => {
    const sut = makeSut()
    const fakeUser = await collection.insertOne({
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

  it('Should throw error if email is not provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
