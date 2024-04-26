require('dotenv').config();

const {Pool} = require('pg')

connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_BASE}`

const pool = new Pool({
  connectionString
})

module.exports = pool;