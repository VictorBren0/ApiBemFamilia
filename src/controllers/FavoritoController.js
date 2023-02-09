const Video = require('../models/Video')

module.exports = {
  async list(req, res) {
    const favoritos = await Video.findAll({
      include: [
        {
          attributes: [],
          association: 'usuarios',
          where: {
            id: req.usuarioID,
          },
        },
      ],
      include: {
        association: 'avaliacoes',
        attributes: ['nome']
      },
    })
    return res.json(favoritos)
  },

  async store(req, res) {
    const { video_id } = req.params

    const video = await Video.findByPk(video_id)
    if (!video) {
      return res.status(400).json({ error: 'Video não encontrado' })
    }
    await video.addUsuario(req.usuarioID)

    return res.json({ mensagem: 'Video favoritado com sucesso' })
  },

  async delete(req, res) {
    const { video_id } = req.params

    const video = await Video.findByPk(video_id)
    if (!video) {
      return res.status(400).json({ error: 'Video não encontrado!' })
    }

    await video.removeUsuario(req.usuarioID)

    return res.status(200).json({ mensagem: 'Video removido com sucesso!' })
  },
}
