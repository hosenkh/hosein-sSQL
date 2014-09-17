(function(){
  var
  mysql = require('mysql'),
  readline = require('readline'),
  database = 'testDB',
  adminPass = 'qqa',
  publicpass = 'qqa',
  connection = mysql.createConnection({user: 'root', password: ''})
  ;
  connection.connect();
  /**
   * use the database
   */
  connection.query('USE '+database);
  /**
   * create users table
   */
  connection.query('CREATE TABLE users (userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT, firstName VARCHAR(15), lastName VARCHAR(15), userName VARCHAR(10) NOT NULL, password VARCHAR(18) NOT NULL, email VARCHAR(40), tel SMALLINT(13), isActive BOOL)');
  connection.end();
})();
