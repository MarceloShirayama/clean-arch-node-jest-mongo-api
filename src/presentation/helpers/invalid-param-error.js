module.exports = class InvalidParamError extends Error {
  constructor (paramName) {
    super(`Inavlid param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
