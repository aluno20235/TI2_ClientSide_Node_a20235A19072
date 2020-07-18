const MongoClient = require('mongodb').MongoClient;

const mongodb = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true});

// const MongoClient = require('mongodb').MongoClient 
//   , Server = require('mongodb').Server;

// const mongodb = new MongoClient(new Server(process.env.MONGO_SERVER, process.env.MONGO_PORT));

const connectDB = () => {
  return new Promise ((resolve, reject) => {
    mongodb.connect (err => {
      if (err) reject(err);
      else resolve();
    });
  });
};
const getDB = () => mongodb.db('boa');
const disconnectDB = () => _db.close();

module.exports = {connectDB, getDB, disconnectDB};