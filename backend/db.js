const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    `postgres://${process.env.POSTGRES_USER || 'egarrage_user'}:${process.env.POSTGRES_PASSWORD || 'egarrage_pass'}@${process.env.POSTGRES_HOST || 'postgres_db'}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB || 'egarrage_db'}`,

  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Connected successfully to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

module.exports = pool;