const Video = require('../models/Video')
const Avaliacao = require('../models/Avaliacao')
const Yup = require('yup')

module.exports = {
  async store(req, res) {
    const schema = Yup.object()
      .shape({
        pontuacao: Yup.number().min(1).max(5),
        comentario: Yup.string(),
      })
      .noUnknown()

    try {
      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })

      const { video_id } = req.params

      const video = await Video.findByPk(video_id)

      if (!video) {
        return res.status(400).json({ error: 'Video não encontrado' })
      }

      await video.addAvaliacoes(req.usuarioID, {
        through: {
          pontuacao: validFields.pontuacao,
          comentario: validFields.comentario,
        },
      })
      console.log(validFields.pontuacao)
      return res.json(video)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  },
}
