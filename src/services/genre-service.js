const genres = require('./books.json');

exports.getGenres = () => {
    return new Promise((resolve, reject) => {
        resolve(genres);
    });
};

exports.getGenre = id => {
    return new Promise((resolve, reject) => {
        resolve(genres.find(genre => genre._id === id));
    });
};

exports.addGenre = genre => {
    return new Promise((resolve, reject) => {
        resolve({ inserted: 1 });
    });
};

exports.updateGenre = (id, genre) => {
    return new Promise((resolve, reject) => {
        resolve({ updated: 1 });
    });
};

exports.deleteGenre = id => {
    return new Promise((resolve, reject) => {
        resolve({ deleted: 1 });
    });
};