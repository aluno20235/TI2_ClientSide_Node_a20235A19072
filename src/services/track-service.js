const db = require ('../configs/mongodb.js').getDB ();
const ObjectId = require ('mongodb').ObjectID;

exports.getTracks = () => {
    return new Promise((resolve, reject) => {
        db
            .collection('tracks')
            .find()
            .project({ '_id': 1, 'album': 1, 'ntrack': 1, 'track': 1, 'duration' : 1 })
            .toArray()
            .then(tracks => resolve(tracks))
            .catch(err => reject(err));
    });
};

exports.getTrack = id => {
    return new Promise((resolve, reject) => {
        db
            .collection('tracks')
            .findOne({ _id: ObjectId(id) })
            .then(track => resolve(track))
            .catch(err => reject(err));
    });
};

exports.addTrack = body => {
    return new Promise((resolve, reject) => {
        db
            .collection('tracks')
            .insertOne({
                album : body.album,
                ntrack: body.ntrack,
                track: body.track,
                duration: body.duration
            })
            .then(res => resolve({ inserted: 1, _id: res.insertedId }))
            .catch(err => reject(err));
    });
};

exports.updateTrack = (id, body) => {
    return new Promise((resolve, reject) => {
        db
            .collection('tracks')
            .updateOne(
                { _id: ObjectId(id) },
                {
                    $set: {
                        album : body.album,
                        ntrack: body.ntrack,
                        track: body.track,
                        duration: body.duration
                    },
                }
            )
            .then( () => resolve({ updated : 1 }))
            .catch(err => reject(err));
    });
};

exports.deleteTrack = id => {
    return new Promise((resolve, reject) => {
        db
        .collection('tracks')
        .deletedOne(
            { _id: ObjectId(id) },
        )
        .then( () => resolve({ removed: 1 }))
        .catch(err => reject(err));
    });
};