class AuthUseCase {
  async auth (email) {
    if (!email) throw new Error()
  }
}

describe('AuthUseCase', () => {
  it('Should trow error if email is not provider', async () => {
    const sut = new AuthUseCase()
    const promise = sut.auth()
    expect(promise).rejects.toThrow()
  })
})