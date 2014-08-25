(function(){
  var
  mysql = require('mysql'),
  connection = mysql.createConnection({user: "root", pass: ""}),
  errorLogger = function(err){
    if(err){
      console.error('error: '+err.stack);
      return err;
    }
  },
  dbConnector = function(db){
    connection.connect(errorLogger);
    connection.query('USE '+db, errorLogger);
  },
  // addTable = function(db,tableName){
  //   dbConnector(db);
  //   connection.query('CREATE TABLE '+tableName+' (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT)',errorLogger);
  //   connection.end(errorLogger);
  // },
  // deleteTable = function(db,tableName){
  //   dbConnector(db);
  //   connection.query('DROP TABLE '+tableName);
  //   connection.end(errorLogger);
  // },
  // addField = function(db,tableName, fieldName, dataType, charLength, nullity, FK){
  //   dbConnector(db);
    //data types are:
    //numeric types
    //  SMALLINT [UNSIGNED]
    //  MEDIUMINT [UNSIGNED]
    //  INT [UNSIGNED]
    //  BIGINT [UNSIGNEd]
    //  DECIMAL [(M,[D])] [UNSIGNED] //a'adade a'ashari M raghami ba D ragham a'ashar
    //  BIT ([M]) 
    //  FLOAT //a'adade elmi
    //  BOOL //boolean
    //date and time types
    //  DATE //yyyy-mm-dd
    //  DATETIME //yyyy-mm-dd HH:ii:ss
    //  TIME //HH:ii:ss
    //string types
    //  [NATIONAL] CHAR[(M)] //0-255 characters
    //  [NATIONAL] VARCHAR(M) //0-21844 characters
    //  TEXT
    //  BLOB //treated as numbers
    //  ENUM('value 1', 'value 2', ...) //choosing from defined choices (up to 3000 choices or less), only one choice
    //  SET('value 1', 'value 2', ...) //zero or more values from defined values (up to 64 values) 
  //   connection.end(errorLogger);
  // },
  // deleteField = function(db,tableName, fieldName){
  //   dbConnector(db);

  //   connection.end(errorLogger);
  // },
  addRow = function(db,tableName, info){
    dbConnector(db);
    connection.query('INSERT INTO '+tableName+ 'SET ?', info, errorLogger);
    connection.end(errorLogger);
  },
  deleteRow = function(db,tableName, info){
    dbConnector(db);

    connection.end(errorLogger);
  },
  modVal = function(db,tableName, info){
    dbConnector(db);

    connection.end(errorLogger);
  }
  ;

})();