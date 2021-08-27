const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class LoadUserByEmailRepository {
  async load (email) {
    if (!email) throw new MissingParamError('email')
    const collection = await MongoHelper.getCollection('users')
    const user = await collection.findOne(
      { email },
      {
        projection: {
          _id: true,
          password: true
        }
      }
    )
    return user
  }
}
