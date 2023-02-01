const jwt = require('jsonwebtoken')
if (process.env.NODE_ENV == 'development')
  require('dotenv').config({ path: `.env.development` })

let TK_KEY = `${process.env.TK_USER}`

const sign = (data) => {
  const token = jwt.sign({ data }, TK_KEY, {
    expiresIn: '10h',
  })
  return token
}

const verify = (token) => {
  const authData = jwt.verify(token, TK_KEY)
  return authData
}

module.exports = { sign, verify }
