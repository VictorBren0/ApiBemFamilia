//Configuracao do Sequelize para o banco de forma mais simplificada
require('dotenv/config')

module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'bemfamiliaapi',
  port: '3306',
  seedStorage: 'sequelize',
  define: {
    timestamps: true, //saber quando foi criado e atualizado
    underscored: true, //para os dados ficarem clinica_tal, video_tal lloyola
  },
}
