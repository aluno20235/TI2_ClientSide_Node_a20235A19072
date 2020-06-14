const Minio = require("minio");
const fs = require("fs");
const crypto = require("crypto");

var minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "minioadmin",
  secretKey: "minioadmin",
});


const bucket = "boa";

const connectStorage = () => {
  return new Promise((resolve, reject) => {
    minioClient
      .bucketExists(bucket)
      .then((exists) => {
        if (!exists) {
          return minioClient.makeBucket(bucket);
        } else resolve();
      })
      .then(() => resolve())
      .catch((err) => reject("Error creating bucket." + err.message));
  });
};

const mimeTypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/bmp": ".bmp",
  "image/webp": ".webp",
};

const uploadFile = (filePath, mimeType) => {
  return new Promise((resolve, reject) => {
    if (mimeTypes[mimeType]) {
      const fileName = crypto.randomBytes(16).toString("hex") + mimeTypes[mimeType];
      const fileStream = fs.createReadStream(filePath);
      minioClient
        .putObject(bucket, fileName, fileStream)
        .then(() => resetSignature(fileName))
        .then((presignedUrl) => resolve(presignedUrl))
        .catch((err) => reject(err.message));
    } else {
      reject("unsupported mime-type");
    }
  });
};

const removeFile = (fileName) => {
  return new Promise((resolve, reject) => {
    minioClient.removeObject(bucket, fileName, function (err) {
      if (err) reject(err.message);
      else resolve();
    });
  });
};

const resetSignature = (fileName) => {
  return new Promise((resolve, reject) => {
    minioClient.presignedGetObject(bucket, fileName, 60 * 60 * 24 * 7, function (err, presignedUrl) {
      if (err) reject(err.message);
      else resolve(presignedUrl);
    });
  });
};

module.exports = { connectStorage, uploadFile, removeFile, resetSignature };