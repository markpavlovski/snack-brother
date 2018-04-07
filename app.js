const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const axios = require('axios')
const path = require('path')

let sendSlack = false

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

console.log(process.env.PATH)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + `/1.gif`));
})

app.get('/:text', (req, res) => {

  if (sendSlack){
    axios.post(`https://hooks.slack.com/services/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`, {text: `${req.params.text}`})
    .then(function (result) {
      console.log(`\nNew Request - ${req.params.text}`)
    })
  }

  const responseHTML =
  `
  <!DOCTYPE HTML>
  <html>
    <head>
      <style>
        h1 {
          text-align: center
        }
        img {
          margin: auto;
        }
      </style>
    </head>
    <body>

    <h1>${req.params.text}</h1>
    <img src='1.gif'>

    </body>
  </html>
  `
  res.sendFile(path.join(__dirname + `/${req.params.text === "1" ? "1" : "2"}.gif`));
  // res.send(responseHTML)
})



app.get('/slackme/:text', (req, res) => {

    axios.post(`https://hooks.slack.com/services/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`, {text: `${req.params.text}`})
    .then(function (result) {
      console.log(`\nNew Request - ${req.params.text}`)
    })

  res.send(req.params.text)
})

const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)

module.exports = app
