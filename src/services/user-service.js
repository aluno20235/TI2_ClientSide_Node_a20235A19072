const db = require ('../config/mongodb.js').getDB ();
const ObjectId = require ('mongodb').ObjectID;

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        db
            .collection('users')
            .find()
            .project({ '_id': 1, 'name': 1, 'email': 1, 'photo': 1 })
            .toArray()
            .then(users => resolve(users))
            .catch(err => reject(err));
    });
};

exports.getUser = id => {
    return new Promise((resolve, reject) => {
        db
            .collection('users')
            .findOne({ _id: ObjectId(id) })
            .then(user => resolve(user))
            .catch(err => reject(err));
    });
};

exports.addUser = body => {
    return new Promise((resolve, reject) => {
        db
            .collection('users')
            .insertOne({
                email : body.email,
                password : body.password,
                name : body.name,
                photo : body.photo,
                birthday : body.birthday,
                usertype : body.usertype
            })
            .then(res => resolve({ inserted: 1, _id: res.insertedId }))
            .catch(err => reject(err));
    });
};

exports.updateUser = (id, body) => {
    return new Promise((resolve, reject) => {
        db
            .collection('users')
            .updateOne(
                { _id: ObjectId(id) },
                {
                    $set: {
                        email : body.email,
                        password : body.password,
                        name : body.name,
                        photo : body.photo,
                        birthday : body.birthday,
                        usertype : body.usertype
                    },
                }
            )
            .then( () => resolve({ updated : 1 }))
            .catch(err => reject(err));
    });
};

exports.deleteUser = id => {
    return new Promise((resolve, reject) => {
        db
        .collection('users')
        .deletedOne(
            { _id: ObjectId(id) },
        )
        .then( () => resolve({ removed: 1 }))
        .catch(err => reject(err));
    });
};