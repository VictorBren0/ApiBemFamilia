require('dotenv/config')
const express = require('express')
const routes = require('./routes')
const path = require('path')

require('./database')

const app = express()

app.use(express.json())

app.use(
    '/uploads',
     express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    )

app.use(routes)

app.listen(3000)
