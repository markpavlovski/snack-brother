const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  const message = process.env.MESSAGE || 'Please provide an environment variable named MESSAGE'
  res.json({ message })
})

const listener = () => `Listening on port ${port}!`
app.listen(port, listener)

module.exports = app
