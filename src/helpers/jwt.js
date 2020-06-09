const jwt = require("jsonwebtoken");
const key = 'XcLoJdsH9Yq34D0TV3Njb4JCP5U9i7kJ';

exports.createToken = (payload) => {
  return new Promise((resolve, reject) => {
    const options = { expiresIn: "8h", issuer: "boa" };
    jwt.sign(payload, key, options, (error, token) => {
      if (error) reject(error);
      else resolve({ token, ...payload });
    });
  });
};

exports.validateToken = (token) => {
  return new Promise((resolve, reject) => {
    let options = { issuer: "boa" };
    jwt.verify(token, key, options, (error, payload) => {
      if (error) reject(error);
      else resolve(payload);
    });
  });
};