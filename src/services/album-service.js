const albuns = require('./books.json');

exports.getAlbuns = () => {
    return new Promise((resolve, reject) => {
        resolve(albuns);
    });
};

exports.getAlbum = id => {
    return new Promise((resolve, reject) => {
        resolve(albuns.find(album => album._id === id));
    });
};

exports.addAlbum = album => {
    return new Promise((resolve, reject) => {
        resolve({ inserted: 1 });
    });
};

exports.updateAlbum = (id, album) => {
    return new Promise((resolve, reject) => {
        resolve({ updated: 1 });
    });
};

exports.deleteAlbum = id => {
    return new Promise((resolve, reject) => {
        resolve({ deleted: 1 });
    });
};