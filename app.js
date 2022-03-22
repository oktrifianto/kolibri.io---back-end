const express   = require('express')
const app       = express()
const port      = 3000

const UserRoutes  = require('./routes/user.routes')
app.use('/user', UserRoutes)

app.get('/', (req, res) => {
  res.json({
    "status" : res.statusCode,
    "message": "Hello World!"
  })
})

app.listen(port, () => console.log(`Server running on port ${port}`))