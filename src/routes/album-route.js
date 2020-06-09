// importa as dependências e inicializa o roteamento
const express = require ('express');
const AlbunsController = require ('../controllers/album-controller');

const router=express.Router();

const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

//define rotas
router.get ('', authorize(), AlbunsController.getAlbums);
router.get ('/:id', authorize(), AlbunsController.getAlbum);
router.post ('', authorize(roles.Contributor||roles.Admin),AlbunsController.postAlbum);
router.put ('/:id', authorize(roles.Contributor||roles.Admin),AlbunsController.putAlbum);
router.delete ('/:id', authorize(roles.Admin),AlbunsController.deleteAlbum);

module.exports = router;