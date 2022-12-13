const Clinicas = require('../models/Clinicas');

module.exports = {
    async index(req, res){
        const clinicas = await Clinicas.findAll();

        return res.json(clinicas);
    },
    async store(req, res) {
        const {nome, especialidade, endereco, tipo_servico, ativo ,horario_atendimento ,contato, localidade} = req.body;

        const clinicas = await Clinicas.create({nome, especialidade, endereco, tipo_servico, ativo ,horario_atendimento ,contato, localidade});

        return res.json(clinicas);
    }, async delete(req, res) {
        const { id } = req.params;
    
        const clinicas = await Clinicas.findByPk(id);
        if (!clinicas) {
          return res.status(400).json({ error: "Clínica não encontrada!" });
        }
    
        const delclinicas = await Clinicas.findOne({
          where: { id },
        });
    
        await Clinicas.destroy(delclinicas);
    
        return res.status(200).json({ mensagem: "Clínica deletada com sucesso!" });
      },
      async update(req, res) {
        const { id } = req.params;
        const { nome, especialidade, endereco, tipo_servico, ativo ,horario_atendimento ,contato, localidade } = req.body;
    
        const clinicas = await Clinicas.findByPk(id);
        if (!clinicas) {
          return res.status(400).json({ error: "Clínica não encontrada!" });
        }
    
        await Clinicas.update({ nome, especialidade, endereco, tipo_servico, ativo ,horario_atendimento ,contato, localidade }, { where: { id } });
    
        return res.status(200).json({ mensagem: "Clínica alterada com sucesso!" });
      },
};