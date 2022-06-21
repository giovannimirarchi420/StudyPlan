'use strict'

const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./server/db/identifier.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

module.exports = db;

