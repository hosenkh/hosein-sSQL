(function(){
  var
  mysql = require('mysql'),
  readline = require('readline'),
  readLine = readline.createInterface({input: process.stdin, output: process.stdout}),
  liveDB,
  liveTable,
  liveUser,
  form = function(formName, levelArray, retFunc){
    var
    levelIndex = 0,
    answers = [];
    readLine.write(formName+'\n');
    readLine.setPrompt(levelArray[levelIndex]);
    readLine.prompt();
    readLine.on('line', function(line){
      if(levelIndex<levelArray.length-1){
        readLine.setPrompt(levelArray[levelIndex+1]);
        readLine.prompt();
        answers[levelIndex]=line;
        levelIndex ++;
      } else {
        answers[levelIndex]=line;
        readLine.close();
      }
    }).on('close', function(){
      retFunc(answers);
    });
  },
  login = function(){
    var levelArray = ['username: ','password: '];
    form('login', levelArray, function(answers){
      connection = mysql.createConnection({user: answers[0], password: answers[1]});
      connection.connect();
      connection.end();
    });



    
    
  },
  logout = function(){
    connection.end();
  },
  addTable = function(){
    connection.query('CREATE TABLE '+tableName+' (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT)',errorLogger);
    connection.end(errorLogger);
  },
  deleteTable = function(db,tableName){
    dbConnector(db);
    connection.query('DROP TABLE '+tableName);
    connection.end(errorLogger);
  };


//login: user name, password
//liste database ha
//a) afzudane 1 database
//  name database
//  passworde admin
//  passworde public
//  //bazgasht be liste database ha
//b) pak kardane 1 database
//  name database
//  aya motmaennid mikhahid database "" ra pak konid?
//  //bazgasht be liste database ha
//c) kar kardan ba 1 database
//  name database
//  liste table ha
//    a) afzudane yek table
//      name table
//      //bazgasht be liste table ha
//    b) hazfe yek table
//      name table
//      aya motmaennid mikhahid table "" ra az database "" pak konid?
//      //bazgash be liste table ha
//    c) kar ba yek table
//      name table
//      describe
//      a) afzudane yek field
//        //name field
//        //jense field (gozine ha erae shavand)
//        //toole field (gozine ha erae shavand)
//        //null or not null
//        //primary key or not
//        //auto increment or not
//        //foreign key or not
//          //if yes, to which table?
//          //which field?
//        //bazgasht be describe table
//      b) hazfe yek field
//        //agar primary key nabud hazf nashavad
//        //aya motmaennid mikhahid fielde "" ra az table "" dar database "" hazf konid?
//        //bazgasht be describe table
//      c) taghiire khosusiaate yek field
//        //moshakhasate afzudane field
//      d) want more or less? ...
//      e) bazgasht be liste table ha
//    d) want more or less?...
//    e) bazgasht be liste database ha
// d) want more or less? hit "close" and use "mysql -u [your username] -p" and use professional codes.
// // addField = function(db,tableName, fieldName, dataType, charLength, nullity, FK){
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
  return {init: login};
})().init();
