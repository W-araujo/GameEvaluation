require('dotenv/config');

const { CLIENTE, HOST, DATABASE, USER, PASSWORD } = process.env;

module.exports = {

  development: {
    client: CLIENTE,
    connection: {
      database: DATABASE,
      host: HOST,
      user: USER,
      password: PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
