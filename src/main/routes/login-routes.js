const env = require('../config/env')
const LoginRouter = require('../../presentation/routers/login-router')
const AuthUseCase = require('../../domain/usecases/auth-usecase')
const EmailValidator = require('../../utils/helpers/email-validator')
const Encrypter = require('../../utils/helpers/encrypter')
const TokenGenerator = require('../../utils/helpers/token-generator')
const UpdateAccessTokenRepository =
  require('../../infra/repositories/update-access-repository')
const LoadUserByEmailRepository =
  require('../../infra/repositories/load-user-by-email-repository')
const ExpressRouterAdapter = require('../adapter/expressRouterAdapter')

module.exports = router => {
  const emailValidator = new EmailValidator()
  const encrypter = new Encrypter()
  const tokenGenerator = new TokenGenerator(env.tokenSecret)
  const loadUserByEmailRepository = new LoadUserByEmailRepository()
  const updateAccessTokenRepository = new UpdateAccessTokenRepository()
  const authUseCase = new AuthUseCase({
    loadUserByEmailRepository,
    encrypter,
    tokenGenerator,
    updateAccessTokenRepository
  })

  const loginRouter = new LoginRouter({ authUseCase, emailValidator })

  router.post('/login', ExpressRouterAdapter.adapt(loginRouter))
}
