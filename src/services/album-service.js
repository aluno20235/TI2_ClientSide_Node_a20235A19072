const db = require('../configs/mongodb.js').getDB ();
const ObjectId = require('mongodb').ObjectID;

exports.getAlbuns = () => {
    return new Promise((resolve, reject) => {
        db
            .collection('albuns')
            .find()
            .project({ '_id': 1, 'album': 1, 'genre': 1, 'cover': 1 })
            .toArray()
            .then(albuns => resolve(albuns))
            .catch(err => reject(err));
    });
};

exports.getAlbum = id => {
    return new Promise((resolve, reject) => {
        db
            .collection('albuns')
            .findOne({ _id: ObjectId(id) })
            .then(album => resolve(album))
            .catch(err => reject(err));
    });
};

exports.addAlbum = body => {
    return new Promise((resolve, reject) => {
        db
            .collection('albuns')
            .insertOne({
                album: body.album,
                genre: body.genre,
                year: body.year,
                artist: body.artist,
                cover: body.cover
            })
            .then(res => resolve({ inserted: 1, _id: res.insertedId }))
            .catch(err => reject(err));
    });
};

exports.updateAlbum = (id, body) => {
    return new Promise((resolve, reject) => {
        db
            .collection('albuns')
            .updateOne(
                { _id: ObjectId(id) },
                {
                    $set: {
                        album: body.album,
                        genre: body.genre,
                        year: body.year,
                        artist: body.artist,
                        cover: body.cover
                    },
                }
            )
            .then( () => resolve({ updated : 1 }))
            .catch(err => reject(err));
    });
};

exports.deleteAlbum = id => {
    return new Promise((resolve, reject) => {
        db
        .collection('albuns')
        .deletedOne(
            { _id: ObjectId(id) },
        )
        .then( () => resolve({ removed: 1 }))
        .catch(err => reject(err));
    });
};