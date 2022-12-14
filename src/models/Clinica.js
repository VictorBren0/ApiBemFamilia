const { Model, DataTypes } = require("sequelize");

class Clinica extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        especialidade: DataTypes.STRING,
        endereco: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
        horario_atendimento: DataTypes.TIME,
        contato: DataTypes.INTEGER,
        localidade: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Servico, {
      foreignKey: "clinica_id",
      through: "servicos_oferecidos",
      as: "servicos",
    });
  }
}
module.exports = Clinica;
