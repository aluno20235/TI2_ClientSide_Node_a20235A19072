const db = require ('../configs/mongodb.js').getDB ();
const ObjectId = require ('mongodb').ObjectID;

exports.getArtists = () => {
    return new Promise((resolve, reject) => {
        db
            .collection('artists')
            .find()
            .project({ '_id': 1, 'artistname': 1, 'photo': 1 })
            .toArray()
            .then(artists => resolve(artists))
            .catch(err => reject(err));
    });
};

exports.getArtist = id => {
    return new Promise((resolve, reject) => {
        db
            .collection('artists')
            .findOne({ _id: ObjectId(id) })
            .then(artist => resolve(artist))
            .catch(err => reject(err));
    });
};

exports.addArtist = artist => {
    return new Promise((resolve, reject) => {
        db
            .collection('artists')
            .insertOne({
                artistname : body.artistname,
                description : body.description,
                photo : body.photo
            })
            .then(res => resolve({ inserted: 1, _id: res.insertedId }))
            .catch(err => reject(err));
    });
};

exports.updateArtist = (id, artist) => {
    return new Promise((resolve, reject) => {
        db
            .collection('artists')
            .updateOne(
                { _id: ObjectId(id) },
                {
                    $set: {
                        artistname : body.artistname,
                        description : body.description,
                        photo : body.photo
                    },
                }
            )
            .then( () => resolve({ updated : 1 }))
            .catch(err => reject(err));
    });
};

exports.deleteArtist = id => {
    return new Promise((resolve, reject) => {
        db
        .collection('artists')
        .deletedOne(
            { _id: ObjectId(id) },
        )
        .then( () => resolve({ removed: 1 }))
        .catch(err => reject(err));
    });
};