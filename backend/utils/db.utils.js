require('babel-register');
const mysql = require('promise-mysql');
const config = require('../assets/config');

exports.dbConnection = () => {
  return (
    mysql.createConnection({
      host: config.db.host,
      database: config.db.database,
      user: config.db.user,
      password: config.db.password,
    })
  );
};
