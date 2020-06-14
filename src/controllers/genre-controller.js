const genreService = require('../services/genre-service');

exports.getGenres = (req, res) => {
    genreService
        .getGenres(req.query)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.getGenre = (req, res) => {
    genreService
        .getGenre(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.postGenre = (req, res) => {
    genreService
        .addGenre(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.putGenre = (req, res) => {
    genreService
        .updateGenre(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.deleteGenre = (req, res) => {
    genreService
        .deleteGenre(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};