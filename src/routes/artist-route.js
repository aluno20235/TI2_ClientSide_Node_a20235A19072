// importa as dependências e inicializa o roteamento
const express = require ('express');
const ArtistsController = require ('../controllers/artist-controller');

const router=express.Router();

//define rotas
router.get ('', ArtistsController.getArtists);
router.get ('/:id', ArtistsController.getArtist);
router.post ('', ArtistsController.postArtist);
router.put ('/:id', ArtistsController.putArtist);
router.delete ('/:id', ArtistsController.deleteArtist);

module.exports = router;