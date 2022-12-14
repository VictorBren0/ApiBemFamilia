const { Model, DataTypes } = require("sequelize");

class Servico extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Regiao, { foreignKey: "servico_id", as: "servicos" });
    this.belongsToMany(models.Clinica, {
      foreignKey: "servico_id",
      through: "servicos_oferecidos",
      as: "clinicas",
    });
  }
}
module.exports = Servico;
