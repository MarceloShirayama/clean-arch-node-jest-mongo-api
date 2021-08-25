const express = require('express')

const app = express()

const host = 'localhost'
const port = 5858
const url = `http://${host}:${port}`

app.listen(port, host, () => console.log(`Server on: ${url}`))
