const userService = require('../services/user-service');

exports.getUsers = (req, res) => {
    userService
        .getUser()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.getUser = (req, res) => {
    userService
        .getUser(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.postUser = (req, res) => {
    userService
        .addUser(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.putUser = (req, res) => {
    userService
        .updateUser(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.deleteUser = (req, res) => {
    userService
        .deleteUser(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};