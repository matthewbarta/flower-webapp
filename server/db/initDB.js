const path = require('path');
const sqlite = require('sqlite3');

const db = new sqlite.Database('/Users/matthewbarta/Desktop/final/server/db/flowers.db', (err) => console.log());

module.exports = db;