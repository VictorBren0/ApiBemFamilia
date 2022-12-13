const Regiao = require("../models/Regiao");
const Servicos = require("../models/Servicos");

module.exports = {
  async index(req, res) {
    const { servicos_id } = req.params;

    const regiao = await Regiao.findAll({ where: { servicos_id } });

    return res.json(regiao);
  },
  async store(req, res) {
    const { servicos_id } = req.params;

    const { estado } = req.body;

    const servicos = await Servicos.findByPk(servicos_id);

    if (!servicos) {
      return res.status(400).json({ error: "Nenhum serviço encontrado" });
    }
    const regiao = await Regiao.create({
      estado,
      servicos_id,
    });
    return res.json(regiao);
  }, async delete(req, res) {
    const { servicos_id } = req.params;

    const servicos = await Servicos.findByPk(servicos_id);
    if (!servicos) {
      return res.status(400).json({ error: "Serviço não encontrado!" });
    }

    const delregiao = await Regiao.findOne({
      where: { id },
    });

    await Regiao.destroy(delregiao);

    return res.status(200).json({ mensagem: "Serviço deletado com sucesso!" });
  },
  async update(req, res) {
    const { servicos_id } = req.params;
    const { estado } = req.body;

    const regiao = await Regiao.findByPk(id);
    if (!regiao) {
      return res.status(400).json({ error: "Serviço não encontrado!" });
    }

    await Regiao.update({ estado }, { where: { servicos_id } });

    return res.status(200).json({ mensagem: "Serviço alterado com sucesso!" });
  },
};
