const db = require ('../configs/mongodb.js').getDB ();
const store = require("../configs/minio.js");
const ObjectId = require ('mongodb').ObjectID;

exports.getArtists = (queryString) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (queryString.search) {
          filter.artistname = { $regex: new RegExp(queryString.search, "i") };
        }
        db
            .collection('artists')
            .find(filter)
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

exports.addArtist = body => {
    return new Promise((resolve, reject) => {
        db
            .collection('artists')
            .insertOne({
                artistname : body.artistname,
                description : body.description,
            })
            .then(res => resolve({ inserted: 1, _id: res.insertedId }))
            .catch(err => reject(err));
    });
};

exports.updateArtist = (id, body) => {
    return new Promise((resolve, reject) => {
        db
            .collection('artists')
            .updateOne(
                { _id: ObjectId(id) },
                {
                    $set: {
                        artistname : body.artistname,
                        description : body.description,
                    },
                }
            )
            .then( () => resolve({ updated : 1 }))
            .catch(err => reject(err));
    });
};

exports.deleteArtist = (id) => {
    return new Promise((resolve, reject) => {
        db
        .collection('artists')
        .deleteOne(
            { _id: ObjectId(id) },
        )
        .then( () => resolve({ removed: 1 }))
        .catch(err => reject(err));
    });
};

exports.updateArtistPhoto = (id, file) => {
    return new Promise((resolve, reject) => {
      let url = "";
      console.log(id, file);
      db.collection("artists")
        .findOne({ _id: ObjectId(id) })
        .then((artist) => {
            console.log(artist);
          let promises = [store.uploadFile(file.path, file.type)];
          if (artist.photo) {
            const aux = artist.photo.split("?")[0].split("/");
            promises.push(store.removeFile(aux[aux.length - 1]));
          }
          return Promise.all(promises);
        })
        .then(([presignedUrl, deleted]) => {
          url = presignedUrl;
          return db.collection("artists").updateOne({ _id: ObjectId(id) }, { $set: { photo: presignedUrl } });
        })
        .then(() => {
          resolve({ updated: 1, url });
        })
        .catch((err) => reject(err));
    });
  };