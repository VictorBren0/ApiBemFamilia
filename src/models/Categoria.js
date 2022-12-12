const { Model, DataTypes } = require('sequelize')

class Categoria extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        subcategoria: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'categorias',
      }
    )
  }
  static associate(models) {
    this.belongsToMany(models.Video, {
      foreignKey: 'categoria_id',
      through: 'categoria_videos',
      as: 'videos',
    }) //M/M through nome da tabela
    this.belongsToMany(models.Podcast, {
      foreignKey: 'categoria_id',
      through: 'categoria_podcasts',
      as: 'podcasts',
    }) //M/M through nome da tabela
  }
}

module.exports = Categoria
