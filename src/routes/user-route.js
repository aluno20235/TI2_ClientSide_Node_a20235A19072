// importa as dependências e inicializa o roteamento
const express = require ('express');
const userController = require ('../controllers/user-controller');
const router=express.Router();

//define rotas
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;