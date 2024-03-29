const { Model, DataTypes } = require('sequelize')

class Video extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        autor: DataTypes.STRING,
        localizacao: DataTypes.STRING,
        link: DataTypes.STRING,
        nome: DataTypes.STRING,
        file: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `http://144.22.215.111/uploads/${this.file}`
          }
        },
        avaliacaoAvg: {
          type: DataTypes.VIRTUAL,
          get() {
            let total = 0
            if (this.avaliacoes && this.avaliacoes.length > 0) {
              total = this.avaliacoes.reduce(
                (sum, current) => sum + parseFloat(current.Avaliacao.pontuacao),
                0
              )
              total = total / this.avaliacoes.length
            }
            return total
          },
        },
      },
      {
        sequelize,
        tableName: 'videos',
      }
    )
    return this
  }

  static associate(models) {
    this.belongsToMany(models.Categoria, {
      foreignKey: 'video_id',
      through: 'categoria_videos',
      as: 'categorias',
    }) //M/M through nome da tabela
    this.belongsToMany(models.Usuario, {
      foreignKey: 'video_id',
      through: 'favoritos',
      as: 'usuarios',
    }) //M/M through nome da tabela
    this.belongsToMany(models.Usuario, {
      foreignKey: 'video_id',
      through: models.Avaliacao,
      as: 'avaliacoes',
    }) //M/M through nome da tabela
  }
}

module.exports = Video
