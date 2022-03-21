const express   = require('express')
const app       = express()

app.get('/', (req, res) => {
  res.json({
    "status" : res.statusCode,
    "message": "Hello World!"
  })
})

app.listen(3000)