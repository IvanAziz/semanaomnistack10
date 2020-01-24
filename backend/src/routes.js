const {Router} = require('express');
const axios = require('axios');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.patch('/devs', DevController.update);
routes.delete('/devs', DevController.destroy);

routes.get('/search', SearchController.index);
// ####  Métodos HTTP  ####
// GET => Buscar recurso ex: (usuário, produto...)
// POST => Salvar recurso ex: (usuário, produto...)
// PUT => Editar recurso ex: (usuário, produto...)
// DELETE => Remover recurso  ex: (usuário, produto...)

// Tipos de parâmetro
// Query Params [GET]: request.query (Filtros, ordenação, paginação, ..)
// Route Params [PUT|DELTE]: request.params (identificar um recurso na alteração ou remoção)
// Body [POST|PUT]: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional)



module.exports = routes;