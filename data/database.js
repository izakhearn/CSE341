const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;

let _db;

const initDb = (callback) => {
 if (_db) {
     console.warn('Trying to init DB again!');
     return callback(null, _db);
 }
 MongoClient.connect(url).then((client) => {
        _db = client.db('CSE341');
        console.log('DB connected - ', _db);
        return callback(null, _db);
    }).catch((err) => {
        return callback(err);
    });
}

const getDb = () => {
    if (!_db) {
        console.warn('DB has not been initialized. Please call init first.');
        return null;
    }
    return _db;
}

module.exports = {
    initDb,
    getDb
};