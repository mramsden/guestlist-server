const { Pool } = require('pg');

function Driver() {
    this.connection = new Pool({
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.DATABASE_PORT || 5432,
        user: process.env.DATABASE_USER || 'guestlist',
        password: process.env.DATABASE_PASSWORD || 'guestlist',
        database: process.env.DATABASE_NAME || 'guestlist'
    });
}

Driver.prototype.query = async function (stmt) {
    return this.connection.query(stmt);
}

module.exports = Driver;
