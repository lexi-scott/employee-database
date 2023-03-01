const mysql = require('mysql2'); // require sql

const dbConnector = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "employeeManager_db"
  });

  module.exports = dbConnector;