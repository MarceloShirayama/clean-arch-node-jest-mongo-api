class EmailValidator {
  isValid (email) {
    return true
  }
}

describe('EmailValidator', () => {
  it('Should return true if validator returns true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })
})
