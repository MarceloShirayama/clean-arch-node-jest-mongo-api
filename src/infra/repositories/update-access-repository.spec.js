const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const UpdateAccessTokenRepository = require('./update-access-repository')

let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('Update Access Repository', () => {
  let fakeUserId

  beforeAll(async () => {
    const url = process.env.MONGO_URL
    await MongoHelper.connect(url)
    db = await MongoHelper.db
  })

  beforeEach(async () => {
    const { userModel } = makeSut()
    await userModel.deleteMany()
    const fakeUser = await userModel.insertOne({
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
    const { sut, userModel } = makeSut()
    await sut.update(fakeUserId, 'valid_token')
    const updatedFakeUser = await userModel.findOne(
      { _id: fakeUserId }
    )
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })

  it('Should throw error if userModel is not provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const promise = sut.update(fakeUserId, 'valid_token')
    expect(promise).rejects.toThrow()
  })

  it('Should throw error if params are not provided', async () => {
    const { sut } = makeSut()
    let promise = sut.update()
    expect(promise).rejects.toThrow(new MissingParamError('userId'))
    promise = sut.update(fakeUserId)
    expect(promise).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
