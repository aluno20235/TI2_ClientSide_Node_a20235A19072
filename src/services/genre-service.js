const db = require('../configs/mongodb.js').getDB ();
const ObjectId = require('mongodb').ObjectID;

exports.getGenres = () => {
    return new Promise((resolve, reject) => {
        db
            .collection('genres')
            .find()
            .project({ '_id': 1, 'genre': 1 })
            .toArray()
            .then(genres => resolve(genres))
            .catch(err => reject(err));
    });
};

exports.getGenre = id => {
    return new Promise((resolve, reject) => {
        db
            .collection('genres')
            .findOne({ _id: ObjectId(id) })
            .then(genre => resolve(genre))
            .catch(err => reject(err));
    });
};

exports.addGenre = body => {
    return new Promise((resolve, reject) => {
        db
            .collection('genres')
            .insertOne({
                genre: body.genre,
                description: body.description
            })
            .then(res => resolve({ inserted: 1, _id: res.insertedId }))
            .catch(err => reject(err));
    });
};

exports.updateGenre = (id, body) => {
    return new Promise((resolve, reject) => {
        db
            .collection('genres')
            .updateOne(
                { _id: ObjectId(id) },
                {
                    $set: {
                        genre: body.genre,
                        description: body.description
                    },
                }
            )
            .then(() => resolve({ updated: 1 }))
            .catch(err => reject(err));
    });
};

exports.deleteGenre = id => {
    return new Promise((resolve, reject) => {
        db
            .collection('genres')
            .deletedOne(
                { _id: ObjectId(id) },
            )
            .then(() => resolve({ removed: 1 }))
            .catch(err => reject(err));
    });
};