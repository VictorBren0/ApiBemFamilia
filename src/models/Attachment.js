const { Model, DataTypes } = require('sequelize')

class Attachments extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        file: DataTypes.STRING,
        url: {
            type: DataTypes.VIRTUAL,
            get() {
                return `http://localhost:3000/attachments/${this.file}`
            }
        }
      },
      {
        sequelize
      }
    )
    return this
  }
}

module.exports = Attachments
