const artistService = require('../services/artist-service');
const formidable = require("formidable");

exports.getArtists = (req, res) => {
    artistService
        .getArtists(req.query)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.getArtist = (req, res) => {
    artistService
        .getArtist(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.postArtist = (req, res) => {
    artistService
        .addArtist(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.putArtist = (req, res) => {
    artistService
        .updateArtist(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.deleteArtist = (req, res) => {
    artistService
        .deleteArtist(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.updateArtistPhoto = (req, res) => {
    formidable().parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        artistService
          .updateArtistPhoto(req.params.id, files.photo)
          .then((result) => res.json(result))
          .catch((err) => res.status(500).send(err.message));
      }
    });
  };