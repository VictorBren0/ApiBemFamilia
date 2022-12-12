const Podcast = require('../models/Podcast')
const Categoria = require('../models/Categoria')

module.exports = {
  async index(req, res) {
    const { id } = req.params

    const podcast = await Podcast.findByPk(id)
    if (!podcast) {
      return res.status(400).json({ error: 'Podcast não encontrado!' })
    }

    const listPodcast = await Podcast.findOne({
      where: { id },
    })

    return res.json(listPodcast)
  },

  async list(req, res) {
    const { page = 1 } = req.query

    const podcasts = await Podcast.findAll({
      attributes: ['id', 'titulo', 'ativo'],
      limit: 20,
      offset: (page - 1) * 20
    })

    return res.json(podcasts)
  },

  async store(req, res) {
    const { categoria_id } = req.params
    const { titulo, descricao, localizacao, url } = req.body

    const categoria = await Categoria.findByPk(categoria_id)

    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada' })
    }
    //PROCURA E SE NAO EXISTIR ELE VAI CRIAR
    const [podcast] = await Podcast.findOrCreate({
      where: { titulo, descricao, localizacao, url },
    })

    await categoria.addPodcast(podcast)

    return res.json(podcast)
  },

  async delete(req, res) {
    const { categoria_id } = req.params
    const { id } = req.body

    const categoria = await Categoria.findByPk(categoria_id)

    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada' })
    }

    const podcast = await Podcast.findOne({
      where: { id },
    })
    if (!podcast) {
      return res.status(400).json({ error: 'Podcast não existe' })
    }

    await categoria.removePodcast(podcast)

    return res.status(200).json({ mensagem: 'Podcast removido com sucesso!' })
  },

  async update(req, res) {
    const { id } = req.params
    const { categoria_id } = req.params
    const { titulo, descricao, localizacao, url, ativo } = req.body

    const categoria = await Categoria.findByPk(categoria_id)
    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada!' })
    }

    const podcast = await Podcast.findByPk(id)
    if (!podcast) {
      return res.status(400).json({ error: 'Podcast não encontrado!' })
    }

    await Podcast.update(
      {
        titulo: titulo,
        descricao: descricao,
        localizacao: localizacao,
        url: url,
        ativo: ativo,
      },
      { where: { id: id } }
    )

    return res.status(200).json({ mensagem: 'Podcast alterado com sucesso!' })
  },
}
