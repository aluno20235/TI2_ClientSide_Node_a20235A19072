// importa as dependências e inicializa o roteamento
const express = require ('express');
const AlbunsController = require ('../controllers/album-controller');

const router=express.Router();

const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

//define rotas
router.get ('', AlbunsController.getAlbums);
router.get ('/:id', AlbunsController.getAlbum);
router.post ('', authorize(),AlbunsController.postAlbum);
router.put ('/data/:id', authorize(),AlbunsController.putAlbum);
router.put ('/cover/:id', authorize(),AlbunsController.updateAlbumCover);
router.delete ('/:id', authorize(roles.Admin),AlbunsController.deleteAlbum);

module.exports = router;