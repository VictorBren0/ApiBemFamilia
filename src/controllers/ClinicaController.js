const Clinica = require('../models/Clinica')

module.exports = {
  async index(req, res) {
    const { clinica_id } = req.params
    const clinica = await Clinica.findByPk(clinica_id, {
      include: {
        association: 'servicos',
        through: { attributes: [] },
      },
    })
    if (!clinica) {
      return res.status(400).json({ error: 'Clinica não encontrada!' })
    }

    return res.json(clinica)
  },

  async list(req, res) {
    const { page = 1 } = req.query
    const clinicas = await Clinica.findAll({
      include: {
        association: 'servicos',
        attributes: ['nome'],
      },
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(clinicas)
  },

  async store(req, res) {
    const { nome, especialidade, endereco, horario_atendimento, contato, localidade } = req.body

    const clinica = await Clinica.create({ nome, especialidade, endereco, horario_atendimento, contato, localidade })

    return res.json(clinica)
  },

  async delete(req, res) {
    const { id } = req.params

    const clinica = await Clinica.findByPk(id)
    if (!clinica) {
      return res.status(400).json({ error: 'Clinica não encontrada!' })
    }

    const delclinica = await Clinica.findOne({
      where: { id },
    })

    await clinica.destroy(delclinica)

    return res.status(200).json({ mensagem: 'Clinica deletada com sucesso!' })
  },

  async update(req, res) {
    const { id } = req.params
    const { nome, especialidade, endereco, horario_atendimento, contato, localidade, ativo } = req.body

    const clinica = await Clinica.findByPk(id)
    if (!clinica) {
      return res.status(400).json({ error: 'Clinica não encontrada!' })
    }

    await Clinica.update(
      { nome: nome, especialidade: especialidade, endereco: endereco, horario_atendimento: horario_atendimento, contato: contato, localidade: localidade, ativo: ativo },
      { where: { id: id } }
    )

    return res.status(200).json({ mensagem: 'Clinica alterada com sucesso!' })
  },
}
