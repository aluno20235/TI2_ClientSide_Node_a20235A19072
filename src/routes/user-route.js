// importa as dependências e inicializa o roteamento
const express = require ('express');
const userController = require ('../controllers/user-controller');
const router=express.Router();

const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

//define rotas
router.post("/register", userController.register);
router.post("/login", userController.login);

//define rotas
router.get ('', authorize(), userController.getUsers);
router.get ('/:id', authorize(), userController.getUser);
router.put ('/:id', authorize(roles.Contributor||roles.Admin),userController.putUser);
router.delete ('/:id', authorize(roles.Admin),userController.deleteUser);

module.exports = router;