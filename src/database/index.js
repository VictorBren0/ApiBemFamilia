//Onde usamos o sequelize para falzer a conecao com o banco

const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Video = require('../models/Video');
const Categoria = require('../models/Categoria');
const Avaliacao = require('../models/Avaliacao');
const Podcast = require('../models/Podcast');

const connection = new Sequelize(dbConfig)

Usuario.init(connection)
Categoria.init(connection)
Video.init(connection)
Avaliacao.init(connection)
Podcast.init(connection)

Usuario.associate(connection.models)
Categoria.associate(connection.models)
Video.associate(connection.models)
Podcast.associate(connection.models)

module.exports = connection
