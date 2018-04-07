const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const axios = require('axios')

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

app.post('/', (req, res) => {
  const message = process.env.MESSAGE || 'Please provide an environment variable named MESSAGE'
  axios.post(`https://hooks.slack.com/services/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`, {text: `${req.body.text}`})
  .then(function (result) {

    console.log("\nNew Request")
  })
  res.json(req.body)
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

module.exports = app
