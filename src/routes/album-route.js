// importa as dependências e inicializa o roteamento
const express = require ('express');
const AlbunsController = require ('../controllers/album-controller');

const router=express.Router();

//define rotas
router.get ('', AlbunsController.getAlbums);
router.get ('/:id', AlbunsController.getAlbum);
router.post ('', AlbunsController.postAlbum);
router.put ('/:id', AlbunsController.putAlbum);
router.delete ('/:id', AlbunsController.deleteAlbum);

module.exports = router;