const trackService = require('../services/track-service');

exports.getTracks = (req, res) => {
    trackService
        .getTracks()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.getTrack = (req, res) => {
    trackService
        .getTrack(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.postTrack = (req, res) => {
    trackService
        .addTrack(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.putTrack = (req, res) => {
    trackService
        .updateTrack(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.deleteTrack = (req, res) => {
    trackService
        .deleteTrack(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};