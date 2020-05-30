const albumService = require('../services/album-service');

exports.getAlbums = (req, res) => {
    albumService
        .getAlbuns()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.getAlbum = (req, res) => {
    albumService
        .getAlbum(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.postAlbum = (req, res) => {
    albumService
        .addAlbum(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.putAlbum = (req, res) => {
    albumService
        .updateAlbum(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.deleteAlbum = (req, res) => {
    albumService
        .deleteAlbum(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};