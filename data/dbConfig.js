const knex = require('knex');
const db = process.env.DB_ENV || 'development';
const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig[db]);
