require('dotenv').config()
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'networkingdatabase2'
})


module.exports = pool;
