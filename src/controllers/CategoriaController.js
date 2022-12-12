const Categoria = require('../models/Categoria')
const { list } = require('./VideoController')

module.exports = {
  async index(req, res) {
    const { categoria_id } = req.params
    const categoria = await Categoria.findByPk(categoria_id, {
      include: {
        association: 'videos',
        through: { attributes: [] },
      },
    })
    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada!' })
    }

    return res.json(categoria)
  },

  async list(req, res) {
    const { page = 1 } = req.query
    const categorias = await Categoria.findAll({
      include: {
        association: 'videos',
        attributes: ['id', 'titulo', 'url', 'ativo'],
      },
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(categorias)
  },

  async store(req, res) {
    const { nome, subcategoria } = req.body

    const categoria = await Categoria.create({ nome, subcategoria })

    return res.json(categoria)
  },

  async delete(req, res) {
    const { id } = req.params

    const categoria = await Categoria.findByPk(id)
    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada!' })
    }

    const delcategoria = await Categoria.findOne({
      where: { id },
    })

    await categoria.destroy(delcategoria)

    return res.status(200).json({ mensagem: 'Categoria deletada com sucesso!' })
  },

  async update(req, res) {
    const { id } = req.params
    const { nome, subcategoria, ativo } = req.body

    const categoria = await Categoria.findByPk(id)
    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada!' })
    }

    await Categoria.update(
      { nome: nome, subcategoria: subcategoria, ativo: ativo },
      { where: { id: id } }
    )

    return res.status(200).json({ mensagem: 'Categoria alterada com sucesso!' })
  },
}
