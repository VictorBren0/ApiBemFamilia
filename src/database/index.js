//Onde usamos o sequelize para falzer a conecao com o banco

const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario');
const Video = require('../models/Video');
const Categoria = require('../models/Categoria');
const Avaliacao = require('../models/Avaliacao');
const Podcast = require('../models/Podcast');
const Clinica = require("../models/Clinica");
const Regiao = require("../models/Regiao");
const Servico = require("../models/Servico");


const connection = new Sequelize(dbConfig)

Usuario.init(connection)
Categoria.init(connection)
Video.init(connection)
Avaliacao.init(connection)
Podcast.init(connection)
Clinica.init(connection)
Regiao.init(connection)
Servico.init(connection)


Usuario.associate(connection.models)
Categoria.associate(connection.models)
Video.associate(connection.models)
Podcast.associate(connection.models)
Clinica.associate(connection.models)
Regiao.associate(connection.models)
Servico.associate(connection.models)
Avaliacao.associate(connection.models)


module.exports = connection
