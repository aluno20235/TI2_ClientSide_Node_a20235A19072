// importa as dependências e inicializa o roteamento
const express = require ('express');
const ArtistsController = require ('../controllers/artist-controller');

const router=express.Router();

const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

//define rotas
router.get ('', ArtistsController.getArtists);
router.get ('/:id', ArtistsController.getArtist);
router.post ('', authorize(),ArtistsController.postArtist);
router.put ('/data/:id',authorize(),ArtistsController.putArtist);
router.put ('/photo/:id',authorize(),ArtistsController.updateArtistPhoto);
router.delete ('/:id', authorize(roles.Admin),ArtistsController.deleteArtist);

module.exports = router;