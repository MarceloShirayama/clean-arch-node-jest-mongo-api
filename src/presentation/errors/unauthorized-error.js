module.exports = class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized Error')
    this.name = 'UnauthorizedError'
  }
}
