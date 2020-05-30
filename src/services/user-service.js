const users = require('./books.json');

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
};

exports.getUser = id => {
    return new Promise((resolve, reject) => {
        resolve(users.find(user => user._id === id));
    });
};

exports.addUser = user => {
    return new Promise((resolve, reject) => {
        resolve({ inserted: 1 });
    });
};

exports.updateUser = (id, user) => {
    return new Promise((resolve, reject) => {
        resolve({ updated: 1 });
    });
};

exports.deleteUser = id => {
    return new Promise((resolve, reject) => {
        resolve({ deleted: 1 });
    });
};