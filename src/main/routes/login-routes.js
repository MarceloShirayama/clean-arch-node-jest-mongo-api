const LoginRouterComposer = require('../composers/login-router-composer')
const { adapt } = require('../adapter/expressRouterAdapter')

module.exports = router => {
  router.post(
    '/login', adapt(LoginRouterComposer.compose())
  )
}
