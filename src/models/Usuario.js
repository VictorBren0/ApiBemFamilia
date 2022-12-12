const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING(70),
        email: DataTypes.STRING(120),
        login: DataTypes.STRING(20),
        senha: DataTypes.VIRTUAL,
        senha_hash: DataTypes.STRING,
        ativo: DataTypes.BOOLEAN,
        is_admin: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'usuarios',
      }
    )
    this.addHook('beforeSave', async (Usuario) => {
      if (Usuario.senha) {
        Usuario.senha_hash = await bcrypt.hash(Usuario.senha, 8)
      }
    })
    return this
  }

  checkPassword(senha) {
    return bcrypt.compare(senha, this.senha_hash)
  }

  static associate(models) {
    this.belongsToMany(models.Video, {
      foreignKey: 'usuario_id',
      through: 'favoritos',
      as: 'videos',
    }) //M/M through nome da tabela
  }
}

module.exports = Usuario
