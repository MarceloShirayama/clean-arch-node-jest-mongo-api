jest.mock('validator', () => ({
  isEmailValid: true,
  email: '',

  isEmail (email) {
    this.email = email
    return this.isEmailValid
  }
}))

const validator = require('validator')
const { MissingParamError } = require('../errors')
const EmailValidator = require('./email-validator')

const makeSut = () => {
  return new EmailValidator()
}

describe('EmailValidator', () => {
  it('Should return true if validator returns true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  it('Should return false if validator returns false', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })

  it('Should call validator with correct email', () => {
    validator.isEmailValid = false
    const sut = makeSut()
    sut.isValid('any_email@mail.com')
    expect(validator.email).toBe('any_email@mail.com')
  })

  it('Should throw error if email is not provided', async () => {
    const sut = makeSut()
    expect(() => sut.isValid()).toThrow(new MissingParamError('email'))
  })
})
