// importa as dependências e inicializa o roteamento
const express = require ('express');
const TracksController = require ('../controllers/track-controller');

const router=express.Router();

const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

//define rotas
router.get ('',authorize() ,TracksController.getTracks);
router.get ('/:id',authorize() ,TracksController.getTrack);
router.post ('',authorize(roles.Contributor||roles.Admin) ,TracksController.postTrack);
router.put ('/:id',authorize(roles.Contributor||roles.Admin) ,TracksController.putTrack);
router.delete ('/:id',authorize(roles.Admin) ,TracksController.deleteTrack);

module.exports = router;