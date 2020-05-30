// importa as dependências e inicializa o roteamento
const express = require ('express');
const GenresController = require ('../controllers/genre-controller');

const router=express.Router();

//define rotas
router.get ('', GenresController.getGenres);
router.get ('/:id', GenresController.getGenre);
router.post ('', GenresController.postGenre);
router.put ('/:id', GenresController.putGenre);
router.delete ('/:id', GenresController.deleteGenre);

module.exports = router;