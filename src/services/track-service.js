const tracks = require('./books.json');

exports.getTracks = () => {
    return new Promise((resolve, reject) => {
        resolve(tracks);
    });
};

exports.getTrack = id => {
    return new Promise((resolve, reject) => {
        resolve(tracks.find(track => track._id === id));
    });
};

exports.addTrack = track => {
    return new Promise((resolve, reject) => {
        resolve({ inserted: 1 });
    });
};

exports.updateTrack = (id, track) => {
    return new Promise((resolve, reject) => {
        resolve({ updated: 1 });
    });
};

exports.deleteTrack = id => {
    return new Promise((resolve, reject) => {
        resolve({ deleted: 1 });
    });
};