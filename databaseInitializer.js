(function(){
  var
  mysql = require('mysql'),
  readline = require('readline'),
  database = 'testDB',
  adminPass = 'qqa',
  publicpass = 'qqa',
  connection = mysql.createConnection({user: 'root', password: ''}),
  readLine = readline.createInterface({input: process.stdin, output: process.stdout})
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
   * create public user
   */
  connection.query('CREATE USER "public"@"localhost" IDENTIFIED BY "'+publicpass+'"');
  connection.query('GRANT DELETE ON '+database+'.* TO "public"@"localhost"');
  connection.query('GRANT INSERT ON '+database+'.* TO "public"@"localhost"');
  connection.query('GRANT SELECT ON '+database+'.* TO "public"@"localhost"');
  connection.query('FLUSH PRIVILEGES');
  /**
   * use the database
   */
  connection.query('USE '+database);

  connection.query('CREATE TABLE signUp (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, firstName VARCHAR(15), lastName VARCHAR(15), userName VARCHAR(10) NOT NULL, password VARCHAR(18) NOT NULL, email VARCHAR(40), tel SMALLINT(13))');
  readLine.question('sdsdfsdf', function(answer){
    console.log(answer);
    readLine.close();
  });
  connection.end();
})();
