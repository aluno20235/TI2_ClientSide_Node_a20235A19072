// importa as dependências e inicializa o roteamento
const express = require ('express');
const UsersController = require ('../controllers/user-controller');

const router=express.Router();

//define rotas
router.get ('', UsersController.getUsers);
router.get ('/:id', UsersController.getUser);
router.post ('', UsersController.postUser);
router.put ('/:id', UsersController.putUser);
router.delete ('/:id', UsersController.deleteUser);

module.exports = router;