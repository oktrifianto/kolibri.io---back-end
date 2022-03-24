const express   = require('express')
const app       = express()
const port      = 3000
app.use(express.json()); // To enable req.body

// import routes
const UserRoutes    = require('./routes/user.routes')
const ProductRoutes = require('./routes/product.routes')
app.use('/user', UserRoutes)
app.use('/product', ProductRoutes)

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