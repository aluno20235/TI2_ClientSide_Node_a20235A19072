// importa as dependências e inicializa o roteamento
const express = require ('express');
const GenresController = require ('../controllers/genre-controller');

const router=express.Router();

const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

//define rotas
router.get ('', GenresController.getGenres);
router.get ('/:id',GenresController.getGenre);
router.post ('',authorize() ,GenresController.postGenre);
router.put ('/:id',authorize() ,GenresController.putGenre);
router.delete ('/:id',authorize(roles.Admin) ,GenresController.deleteGenre);

module.exports = router;