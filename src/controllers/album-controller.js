const albumService = require('../services/album-service');
const formidable = require("formidable");

exports.getAlbums = (req, res) => {
    albumService
        .getAlbuns(req.query)
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

exports.updateAlbumCover = (req, res) => {
    formidable().parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        albumService
          .updateAlbumCover(req.params.id, files.cover)
          .then((result) => res.json(result))
          .catch((err) => res.status(500).send(err.message));
      }
    });
  };