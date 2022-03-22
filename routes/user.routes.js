const express = require('express')
const router  = express.Router()

/**
 * @description   Get all users
 * @method        GET 
 * @path          /user/all
 */
router.get('/all', (req, res) => {
  res.json({
    "status"  : res.statusCode,
    "message" : "Success get all users"
  })
})

module.exports = router;