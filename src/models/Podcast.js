const { Model, DataTypes } = require('sequelize')

class Podcast extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        localizacao: DataTypes.STRING,
        url: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'podcasts',
      }
    )
    return this
  }

  static associate(models) {
    this.belongsToMany(models.Categoria, {
      foreignKey: 'podcast_id',
      through: 'categoria_podcasts',
      as: 'categorias',
    }) //M/M through nome da tabela
  }
}

module.exports = Podcast
