(function(){
  var
  mysql = require('mysql'),
  database = 'testDB',
  connection = mysql.createConnection({user: 'root', password: ''});
  connection.connect();
  connection.query('DROP DATABASE '+database);
  connection.query('DROP USER "admin"@"localhost"');
  connection.end();
})();