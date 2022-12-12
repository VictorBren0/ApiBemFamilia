const express = require('express')
const AvaliacaoController = require('./controllers/AvaliacaoController')
const UsuarioController = require('./controllers/UsuarioController')
const CategoriaController = require('./controllers/CategoriaController')
const VideoController = require('./controllers/VideoController')
const FavoritoController = require('./controllers/FavoritoController')
const AuthController = require('./controllers/AuthController')
const AuthMiddleware = require('./middlewares/AuthMiddleware')
const PodcastController = require('./controllers/PodcastController')

const routes = express.Router()

//AUTENTICAR
routes.post('/auth', AuthController.login)
routes.post('/cadastro', UsuarioController.store)

routes.use(AuthMiddleware)

//USUARIO
routes.get('/usuarios', UsuarioController.index)
routes.get('/usuarios/:id', UsuarioController.show)
routes.put('/usuarios', UsuarioController.update)
//routes.post('/logout', AuthController.logout)//

//CATEGORIAS
routes.get('/categorias', CategoriaController.list)
routes.get('/categorias/:categoria_id', CategoriaController.index)
routes.post('/categorias', CategoriaController.store)
routes.delete('/categorias/:id', CategoriaController.delete)
routes.put('/categorias/:id', CategoriaController.update)

//VIDEOS
routes.get('/videos/:id', VideoController.index)
routes.get('/videos', VideoController.list)
routes.post('/categorias/:categoria_id/videos', VideoController.store)
routes.delete('/categorias/:categoria_id/videos', VideoController.delete)
routes.put('/categorias/:categoria_id/videos/:id', VideoController.update)

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

module.exports = routes
