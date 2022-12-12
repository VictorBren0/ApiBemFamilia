const { Model, DataTypes } = require('sequelize')

class Avaliacao extends Model {
  static init(sequelize) {
    super.init(
      {
        pontuacao: DataTypes.DECIMAL(5, 2),
        comentario: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'avaliacoes',
      }
    )
    return this
  }
}

module.exports = Avaliacao
