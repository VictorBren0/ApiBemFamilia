const Usuario = require('../models/Usuario')
const Yup = require('yup')

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query

    const usuario = await Usuario.findAll({
      attributes: ['id', 'nome', 'login', 'email', 'ativo', 'is_admin'],
      limit: 20,
      offset: (page - 1) * 20,
    })
    return res.json(usuario)
  },

  async show(req, res) {
    const { id } = req.params

    const usuario = await Usuario.findByPk(id, {
      attributes: ['id', 'nome', 'login', 'email', 'ativo', 'is_admin'],
    })

    return res.json(usuario)
  },

  async store(req, res) {
    const schema = Yup.object()
      .shape({
        nome: Yup.string().required().max(70),
        email: Yup.string().email().required().max(120),
        login: Yup.string().required().max(20),
        senha: Yup.string().required().min(8),
      })
      .noUnknown()

    try {
      const emailExists = await Usuario.findOne({
        where: {
          email: req.body.email,
        },
      })
      const loginExists = await Usuario.findOne({
        where: {
          login: req.body.login,
        },
      })

      if (emailExists || loginExists) {
        return res.status(409).json({ error: 'Usuario já cadastrado' })
      }
      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })

      const { id, nome, email, login, ativo, is_admin } = await Usuario.create(
        validFields
      )

      return res.json({ id, nome, email, login, ativo, is_admin })
    } catch (error) {
      return res.status(400).json(error)
    }
  },

  async update(req, res) {
    const schema = Yup.object()
      .shape({
        nome: Yup.string().max(70),
        senha: Yup.string().min(8),
        senha_confirm: Yup.string().required().min(8),
      })
      .noUnknown()

    try {
      const usuario = await Usuario.findByPk(req.usuarioID)

      if (!usuario) {
        return res.status(400).json({ error: 'Usuário não encontrado' })
      }
      if (senha !== senha_confirm) {
        return res.status(409).json({ error: 'As senhas não conhecidem!' })
      }
      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })

      const { nome } = await usuario.update(validFields)

      return res.json({ nome })
    } catch (error) {
      return res.status(400).json(error)
    }
  },
}
