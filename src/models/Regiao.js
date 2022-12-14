const { Model, DataTypes } = require("sequelize");

class Regiao extends Model {
  static init(sequelize) {
    super.init(
      {
        estado: DataTypes.STRING,
      },
      {
        sequelize,
         tableName: 'regioes',
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Servico, {
      foreingKey: "servico_id",
      as: "servicos",
    });
  }
}
module.exports = Regiao;
