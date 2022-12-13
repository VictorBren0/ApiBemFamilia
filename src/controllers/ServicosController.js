const Servicos = require("../models/Servicos");
const Regiao = require("../models/Regiao");

module.exports = {
  async index(req, res) {
    const servicos = await Servicos.findAll();

    const regiao = await Regiao.findByPk(servicos_id, {
      include : { association : "servicos" }
    })
    return res.json(servicos);
  },
  async store(req, res) {
    const { nome, descricao, ativo } = req.body;

    const servicos = await Servicos.create({ nome, descricao, ativo });

    return res.json(servicos);
  },
  async delete(req, res) {
    const { id } = req.params;

    const servicos = await Servicos.findByPk(id);
    if (!servicos) {
      return res.status(400).json({ error: "Serviço não encontrado!" });
    }

    const delservicos = await Servicos.findOne({
      where: { id },
    });

    await servicos.destroy(delservicos);

    return res.status(200).json({ mensagem: "Serviço deletado com sucesso!" });
  },
  async update(req, res) {
    const { id } = req.params;
    const { nome, descricao, ativo } = req.body;

    const servicos = await Servicos.findByPk(id);
    if (!servicos) {
      return res.status(400).json({ error: "Serviço não encontrado!" });
    }

    await Servicos.update({ nome, descricao, ativo }, { where: { id } });

    return res.status(200).json({ mensagem: "Serviço alterado com sucesso!" });
  },
};
