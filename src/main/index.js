const express = require('express')

const app = express()

const host = 'localhost'
const port = 5858
const url = `http://${host}:${port}`

app.disable('x-powered-by')

app.get('/api/mango', (req, resp) => {
  resp.send('Curso de NodeJS com Clean Architecture e TDD do Mango')
})

app.listen(port, host, () => console.log(`Server on: ${url}`))
