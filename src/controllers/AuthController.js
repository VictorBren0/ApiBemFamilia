const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

module.exports = {
  async login(req, res) {
    const { login, senha } = req.body

    const usuario = await Usuario.findOne({ where: { login } })

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado!' })
    }

    if (!(await usuario.checkPassword(senha))) {
      return res.status(401).json({ error: 'Senha invalida!' })
    }

    const { id, nome, email } = usuario

    return res.json({
      usuario: { id, nome, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  },
}
