const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')

module.exports = class LoadUserByEmailRepository {
  async load (email) {
    if (!email) throw new MissingParamError('email')
    const db = await MongoHelper.db
    const user = await db.collection('users').findOne(
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
