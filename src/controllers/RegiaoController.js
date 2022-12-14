const Regiao = require("../models/Regiao");
const Servico = require("../models/Servico");

module.exports = {
  async list(req, res) {
    const { page = 1 } = req.query
    const regioes = await Regiao.findAll({
      include: [
        {
          attributes: [],
          association: 'servicos',
          where: { id },
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(regioes)
  },

  async index(req, res) {
    const { page = 1 } = req.query
    const { id } = req.params

    const regiao = await Regiao.findByPk(id)
    if (!regiao) {
      return res.status(400).json({ error: 'Regiao não encontrada!' })
    }
    const listRegiao = await Regiao.findOne({
      include: [
        {
          attributes: [],
          association: 'servicos',
          where: { id },
        },
      ],
      limit: 20,
      offset: (page - 1) * 20,
    })

    return res.json(listRegiao)
  },


  async store(req, res) {
    const { servico_id } = req.params;

    const servico = await Servico.findByPk(servico_id);

    if (!servico) {
      return res.status(400).json({ error: "Nenhum serviço encontrado" });
    }
    await servico.addRegiao(servico)

    return res.json({ mensagem: 'Serviço adicionado com sucesso' })
  }, 
  
  
  async delete(req, res) {
    const { servico_id } = req.params

    const servico = await Servico.findByPk(servico_id)
    if (!servico) {
      return res.status(400).json({ error: 'Serviço não encontrado!' })
    }

    await servico.removeRegiao(servico)

    return res.status(200).json({ mensagem: 'Serviço removido com sucesso!' })
  },
  
};
