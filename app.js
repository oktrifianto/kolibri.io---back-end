const express   = require('express')
const app       = express()
const port      = 3000
const db        = require('./config/db')

try {
  db.authenticate();
  console.log('Connection has been established successfully!');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const UserRoutes  = require('./routes/user.routes')
app.use('/user', UserRoutes)

app.get('/', (req, res) => {
  res.json({
    "status" : res.statusCode,
    "message": "Hello World!"
  })
})

/**
 * @description   Handling 404 page
 * @method        {all except defined}
 * @path          *
 * @return        404
 */
app.use("*", (req, res) => {
  res.status(404).json({
    "status"  : res.statusCode,
    "message" : "Sorry, page not found"
  })
})

app.listen(port, () => console.log(`Server running on port ${port}`))