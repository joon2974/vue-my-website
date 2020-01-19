const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '34.84.31.32',
  port: 3306,
  user: 'root',
  password: 'qnpfr1437',
  database: 'simpleproject',
  multipleStatements: true
});

module.exports = connection;
