const Servico = require('../models/Servico')
const Clinica = require('../models/Clinica')

module.exports = {
  async index(req, res) {
    const { id } = req.params

    const servico = await Servico.findByPk(id)
    if (!servico) {
      return res.status(400).json({ error: 'Serviço não encontrado!' })
    }

    const listServico = await Servico.findOne({
      where: { id },
    })

    return res.json(listServico)
  },

  async list(req, res) {
    const { page = 1 } = req.query

    const servicos = await Servico.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(servicos)
  },

  async store(req, res) {
    const { clinica_id } = req.params
    const { nome, descricao } = req.body

    const clinica = await Clinica.findByPk(clinica_id)

    if (!clinica) {
      return res.status(400).json({ error: 'Clinica não encontrada' })
    }
    //PROCURA E SE NAO EXISTIR ELE VAI CRIAR
    const [ servico ] = await Servico.findOrCreate({
      where: { nome, descricao },
    })

    await clinica.addServico(servico)

    return res.json(servico)
  },

  async delete(req, res) {
    const { clinica_id  } = req.params
    const { id } = req.body

    const clinica = await Clinica.findByPk(clinica_id )

    if (!clinica) {
      return res.status(400).json({ error: 'Clinica não encontrada' })
    }

    const servico = await Servico.findOne({
      where: { id },
    })
    if (!servico) {
      return res.status(400).json({ error: 'Serviço não existe' })
    }

    await clinica.removeServico(servico)

    return res.status(200).json({ mensagem: 'Serviço removido com sucesso!' })
  },

  async update(req, res) {
    const { id } = req.params
    const { clinica_id } = req.params
    const { nome, descricao, ativo } = req.body

    const clinica = await Clinica.findByPk(clinica_id)
    if (!clinica) {
      return res.status(400).json({ error: 'Clinica não encontrada!' })
    }

    const servico = await Servico.findByPk(id)
    if (!servico) {
      return res.status(400).json({ error: 'Serviço não encontrado!' })
    }

    await Servico.update(
      {
        nome: nome, 
        descrica: descricao,
        ativo: ativo,
      },
      { where: { id: id } }
    )

    return res.status(200).json({ mensagem: 'Serviço alterado com sucesso!' })
  },
}
