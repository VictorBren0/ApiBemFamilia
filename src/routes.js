const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')
const AvaliacaoController = require('./controllers/AvaliacaoController')
const UsuarioController = require('./controllers/UsuarioController')
const CategoriaController = require('./controllers/CategoriaController')
const VideoController = require('./controllers/VideoController')
const FavoritoController = require('./controllers/FavoritoController')
const AuthController = require('./controllers/AuthController')
const AuthMiddleware = require('./middlewares/AuthMiddleware')
const PodcastController = require('./controllers/PodcastController')
const ServicoController = require('./controllers/ServicoController')
const RegiaoController = require('./controllers/RegiaoController')
const ClinicaController = require('./controllers/ClinicaController')
const upload = multer(multerConfig)
const routes = express.Router()



//AUTENTICAR
routes.post('/auth', AuthController.login)
routes.post('/cadastro', UsuarioController.store)

//CATEGORIAS
routes.get('/categorias', CategoriaController.list)
routes.get('/categorias/:categoria_id', CategoriaController.index)
routes.post('/categorias', CategoriaController.store)
routes.delete('/categorias/:id', CategoriaController.delete)
routes.put('/categorias/:id', CategoriaController.update)

//VIDEOS
routes.get('/videos/:id', VideoController.index)
routes.get('/videos', VideoController.list)
routes.post('/categorias/:categoria_id/videos',  upload.single('file'), VideoController.store)
routes.delete('/categorias/:categoria_id/videos', VideoController.delete)
routes.put('/categorias/:categoria_id/videos/:id', upload.single('file'), VideoController.update)



//routes.use(AuthMiddleware)

//USUARIO
routes.get('/usuarios', UsuarioController.index)
routes.get('/usuarios/:id', UsuarioController.show)
routes.put('/usuarios', UsuarioController.update)

//PODCASTS
routes.get('/podcasts/:id', PodcastController.index)
routes.get('/podcasts', PodcastController.list)
routes.post('/categorias/:categoria_id/podcasts', PodcastController.store)
routes.delete('/categorias/:categoria_id/podcasts', PodcastController.delete)
routes.put('/categorias/:categoria_id/podcasts/:id', PodcastController.update)

//FAVORITOS
routes.get('/favoritos', FavoritoController.list)
routes.post('/favoritos/:video_id', FavoritoController.store)
routes.delete('/favoritos/:video_id', FavoritoController.delete)

//AVALIAÇÃO
routes.post('/avaliacoes/:video_id', AvaliacaoController.store)

//CLINICAS
routes.get('/clinicas/:clinica_id', ClinicaController.index)
routes.get('/clinicas', ClinicaController.list)
routes.post('/clinicas', ClinicaController.store)
routes.delete('/clinicas/:id', ClinicaController.delete)
routes.put('/clinicas/:id', ClinicaController.update)

//SERVIÇO
routes.get('/servicos/:id', ServicoController.index)
routes.get('/servicos', ServicoController.list)
routes.post('/servicos/:clinica_id/servicos', ServicoController.store)
routes.delete('/servicos/:clinica_id/servicos', ServicoController.delete)
routes.put('/servicos/:clinica_id/servicos/:id', ServicoController.update)

//REGIAO
routes.get('/regioes', RegiaoController.list)
routes.get('/regioes/:id', RegiaoController.index)
routes.post('/regioes/:servico_id', RegiaoController.store)
routes.delete('/regioes/:servico_id', RegiaoController.delete)

//UPLOAD

module.exports = routes
