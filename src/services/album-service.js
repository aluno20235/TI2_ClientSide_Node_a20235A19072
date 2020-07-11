const db = require('../configs/mongodb.js').getDB ();
const store = require("../configs/minio.js");
const ObjectId = require('mongodb').ObjectID;

exports.getAlbuns = (queryString) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (queryString.search) {
          filter.album = { $regex: new RegExp(queryString.search, "i") };
        }
        db
            .collection('albuns')
            .find(filter)
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
        .deleteOne(
            { _id: ObjectId(id) },
        )
        .then( () => resolve({ removed: 1 }))
        .catch(err => reject(err));
    });
};

exports.updateAlbumCover = (id, file) => {
    console.log(id, file);
    return new Promise((resolve, reject) => {
      let url = "";
      console.log(id, file);
      db.collection("albuns")
        .findOne({ _id: ObjectId(id) })
        .then((album) => {
            console.log(album);
          let promises = [store.uploadFile(file.path, file.type)];
          console.log(promises);
          console.log(album.cover);
          if (album.cover) {
            const aux = album.cover.split("?")[0].split("/");
            console.log(aux);
            promises.push(store.removeFile(aux[aux.length - 1]));
          }
          console.log(promises);
          return Promise.all(promises);

        })
        .then(([presignedUrl, deleted]) => {
            console.log(presignedUrl);
          url = presignedUrl;
          return db.collection("albuns").updateOne({ _id: ObjectId(id) }, { $set: { cover: presignedUrl } });
        })
        .then(() => {
          resolve({ updated: 1, url });
        })
        .catch((err) => reject(err));
    });
  };