const Video = require('../models/Video')
const Categoria = require('../models/Categoria')

module.exports = {
  async index(req, res) {
    const { id } = req.params

    const video = await Video.findByPk(id)
    if (!video) {
      return res.status(400).json({ error: 'Video não encontrado!' })
    }

    const listVideo = await Video.findOne({
      where: { id },
    })

    return res.json(listVideo)
  },

  async list(req, res) {
    const { page = 1 } = req.query

    const videos = await Video.findAll({
      attributes: ['avaliacaoAvg', 'id', 'titulo', 'ativo'],
      limit: 20,
      offset: (page - 1) * 20,
      include: {
        association: 'avaliacoes',
      },
    })

    return res.json(videos)
  },

  async store(req, res) {
    const { categoria_id } = req.params
    const { titulo, nome, descricao, localizacao, url } = req.body

    const categoria = await Categoria.findByPk(categoria_id)

    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada' })
    }
    //PROCURA E SE NAO EXISTIR ELE VAI CRIAR
    const [video] = await Video.findOrCreate({
      where: { titulo, nome, descricao, localizacao, url },
    })

    await categoria.addVideo(video)

    return res.json(video)
  },

  async delete(req, res) {
    const { categoria_id } = req.params
    const { id } = req.body

    const categoria = await Categoria.findByPk(categoria_id)

    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada' })
    }

    const video = await Video.findOne({
      where: { id },
    })
    if (!video) {
      return res.status(400).json({ error: 'Video não existe' })
    }

    await categoria.removeVideo(video)

    return res.status(200).json({ mensagem: 'Video removido com sucesso!' })
  },

  async update(req, res) {
    const { id } = req.params
    const { categoria_id } = req.params
    const { titulo, nome, descricao, localizacao, url, ativo } = req.body

    const categoria = await Categoria.findByPk(categoria_id)
    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada!' })
    }

    const video = await Video.findByPk(id)
    if (!video) {
      return res.status(400).json({ error: 'Video não encontrado!' })
    }

    await Video.update(
      {
        titulo: titulo,
        nome: nome,
        descricao: descricao,
        localizacao: localizacao,
        url: url,
        ativo: ativo,
      },
      { where: { id: id } }
    )

    return res.status(200).json({ mensagem: 'Video alterado com sucesso!' })
  },
}
