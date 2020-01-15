require('dotenv').config();

module.exports = {
  development: {
    username: "root",
    password: "March14Freedom!",
    database: "rewards_db",
    host: "localhost",
    dialect: 'mysql',
  },
  test: {
    username: "root",
    password: "March14Freedom!",
    database: "rewards_db",
    host: "localhost",
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'JAWSDB_URL',
    username: "root",
    password: "March14Freedom!",
    database: "rewards_db",
    host: "localhost",
    dialect: 'mysql',
  },
};
