const bcrypt = require('bcrypt')

class EncrypterSpy {
  async compare (value, hash) {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}

const makeSut = () => {
  return new EncrypterSpy()
}

describe('Encrypter', () => {
  it('Should return true if bcrypt return true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(true)
  })

  it('Should return false if bcrypt return false', async () => {
    const sut = makeSut()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_value', 'hashed_value')
    expect(isValid).toBe(false)
  })

  it('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    await sut.compare('any_value', 'hashed_value')
    expect(bcrypt.value).toBe('any_value')
    expect(bcrypt.hash).toBe('hashed_value')
  })
})
