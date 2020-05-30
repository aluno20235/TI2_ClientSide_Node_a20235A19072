// importa as dependências e inicializa o roteamento
const express = require ('express');
const TracksController = require ('../controllers/track-controller');

const router=express.Router();

//define rotas
router.get ('', TracksController.getTracks);
router.get ('/:id', TracksController.getTrack);
router.post ('', TracksController.postTrack);
router.put ('/:id', TracksController.putTrack);
router.delete ('/:id', TracksController.deleteTrack);

module.exports = router;