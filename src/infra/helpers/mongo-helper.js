const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri) {
    this.uri = uri
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    this.client = await MongoClient.connect(uri, options)
    this.db = this.client.db()
  },

  async disconnect () {
    await this.client.close()
  },

  async getCollection (name) {
    const collection = await this.db.collection(name)
    return collection
  }
}
