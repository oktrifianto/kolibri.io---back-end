const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * req.body.token                 ----- { "token" : "<token.xxxxx.yyyyy.zzzzz>"}
 * req.query.token                ----- domain.com/data?token=xxxxx.yyyyy.zzzzz
 * req.headers['x-access-token']  ----- Authorization: x-access-token <token.xxxxx.yyyyy.zzzzz>
 */
module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    return res.status(403).json({
      message : `A token is required for auth.` 
    })
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message : `Invalid token.`
      })
    }
    next()
  })
}