const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const UpdateAccessTokenRepository = require('./update-access-repository')

let db

const makeSut = () => {
  return new UpdateAccessTokenRepository()
}

describe('Update Access Repository', () => {
  let fakeUserId

  beforeAll(async () => {
    const url = process.env.MONGO_URL
    await MongoHelper.connect(url)
    db = await MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
    const fakeUser = await db.collection('users').insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    fakeUserId = fakeUser.insertedId
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('Should update the user with the given accessToken', async () => {
    const sut = makeSut()
    await sut.update(fakeUserId, 'valid_token')
    const updatedFakeUser = await db.collection('users').findOne(
      { _id: fakeUserId }
    )
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  it('Should throw error if params are not provided', async () => {
    const sut = makeSut()
    let promise = sut.update()
    expect(promise).rejects.toThrow(new MissingParamError('userId'))
    promise = sut.update(fakeUserId)
    expect(promise).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
