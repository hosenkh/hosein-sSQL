(function(){
  var
  mysql = require('mysql'),
  database = 'testDB',
  adminPass = 'qqa',
  connection = mysql.createConnection({user: 'root', password: ''}),
  errorLogger = function(err,success){
    if(err){
      console.error('error: '+err.stack);
      return;
    }
    console.log(success);
  }
  ;
  connection.connect();
  /**
   * create the database
   */
  connection.query('CREATE DATABASE '+database);
  /**
   * create admin user
   */
  connection.query('CREATE USER "admin"@"localhost" IDENTIFIED BY "'+adminPass+'"');
  connection.query('GRANT ALL PRIVILEGES ON '+database+'.* TO "admin"@"localhost"');
  connection.query('FLUSH PRIVILEGES');
  /**
   * use the database
   */
  connection.query('USE '+database);

  connection.query('CREATE TABLE signUp (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, firstName VARCHAR(15), lastName VARCHAR(15), userName VARCHAR(10) NOT NULL, password VARCHAR(18) NOT NULL, email VARCHAR(40), tel SMALLINT(13))');
  connection.end();
})();
