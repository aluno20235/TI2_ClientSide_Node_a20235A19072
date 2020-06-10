// importa as dependências e inicializa o roteamento
const express = require ('express');
const ArtistsController = require ('../controllers/artist-controller');

const router=express.Router();

const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

//define rotas
router.get ('', authorize(),ArtistsController.getArtists);
router.get ('/:id', authorize(),ArtistsController.getArtist);
router.post ('', authorize(roles.Contributor||roles.Admin),ArtistsController.postArtist);
router.put ('/:id',authorize(roles.Contributor||roles.Admin),ArtistsController.putArtist);
router.delete ('/:id', authorize(roles.Admin),ArtistsController.deleteArtist);

module.exports = router;