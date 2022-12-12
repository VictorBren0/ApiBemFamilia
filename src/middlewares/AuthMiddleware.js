const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const tokenDecoded = await promisify(jwt.verify)(token, authConfig.secret)

    req.usuarioID = tokenDecoded.id

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalido' })
  }

}
