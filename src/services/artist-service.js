const artists = require('./books.json');

exports.getArtists = () => {
    return new Promise((resolve, reject) => {
        resolve(artists);
    });
};

exports.getArtist = id => {
    return new Promise((resolve, reject) => {
        resolve(artists.find(artist => artist._id === id));
    });
};

exports.addArtist = artist => {
    return new Promise((resolve, reject) => {
        resolve({ inserted: 1 });
    });
};

exports.updateArtist = (id, artist) => {
    return new Promise((resolve, reject) => {
        resolve({ updated: 1 });
    });
};

exports.deleteArtist = id => {
    return new Promise((resolve, reject) => {
        resolve({ deleted: 1 });
    });
};