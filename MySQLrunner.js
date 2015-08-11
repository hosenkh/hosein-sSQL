(function(){
  var
  mysql = require('mysql'),
  readline = require('readline'),
  liveDB = null,
  liveTable = null,
  liveUser,
  liveArray = [],
  stringify = function(a){
    if (a === null) {
      return 'null';
    } else {
    return a.toString();
    }
  },
  spaces = ['',' ','  ','   ','    ','     ','      ','       ','        ','         ','          ','           ','            ','             ','              ','               ','                ','                 ','                  ','                   '],
  status = 'loggedOff',
  form = function(formName, levelArray, retFunc){
    var
    levelIndex = 0,
    answers = [];
    console.log(formName);
    readLine = readline.createInterface({input: process.stdin, output: process.stdout});
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
        return;
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
      status = 'loggedOn';
      init();
    });
  },
  showDBs = function(){
    connection.query('SHOW DATABASES', function(err, result){
      if (err) console.error('Unable to show databases.');
      liveArray = [];
      liveDB = null;
      liveTable = null;
      for(var i in result){
        liveArray.push(result[i].Database);
      }
      console.log('\nDatabases:\n');
      console.log(liveArray);
      status = 'showDBsDone';
      init();
    });
  },
  showDBsForm = function(){
    var
    formName = 'Which one do you want?\na)add a database\nb)delete a database\nc)use a database\nd)exit\ne)want more or less...',
    levelArray = ['Write the letter only: '],
    retFunc = function(answers){
      switch (answers[0]){
        case 'a':
          status = 'wantsToAddDB';
          init();
        break;
        case 'b':
          status = 'wantsToDeleteDB';
          init();
        break;
        case 'c':
          status = 'wantsToUseDB';
          init();
        break;
        case 'd':
          status = 'wantsToExit';
          init();
        break;
        case 'e':
          status = 'wantMore';
          init();
        break;
        default:
          status = 'showDBsDone';
          init();
        break;
      }
    };
    form(formName, levelArray, retFunc);
  },
  logout = function(){
    connection.end();
  },
  addDB = function(){
    var
    formName = 'adding a new database',
    levelArray = ['name of the database: ',"admin's username, not 'admin' itself!: ", "admin's password: ", 'username for public user, not "public" itself!: ', 'password of the public user: '],
    retFunc = function(answers){
      connection.query('CREATE DATABASE '+answers[0]);
      connection.query('CREATE USER "'+answers[1]+'"@"localhost" IDENTIFIED BY "'+answers[2]+'"');
      connection.query('GRANT ALL PRIVILEGES ON '+answers[0]+'.* TO "'+answers[1]+'"@"localhost"');
      connection.query('FLUSH PRIVILEGES');
      console.log(answers);
      connection.query('CREATE USER "'+answers[3]+'"@"localhost" IDENTIFIED BY "'+answers[4]+'"');
      connection.query('GRANT DELETE ON '+answers[0]+'.* TO "'+answers[3]+'"@"localhost"');
      connection.query('GRANT INSERT ON '+answers[0]+'.* TO "'+answers[3]+'"@"localhost"');
      connection.query('GRANT SELECT ON '+answers[0]+'.* TO "'+answers[3]+'"@"localhost"');
      connection.query('FLUSH PRIVILEGES');
      status = 'loggedOn';
      init();
    };
    form(formName,levelArray,retFunc);
  },
  deleteDB = function(){
    var
    formName = 'delete a database, if you are logged in as the admin of this database, you cannot delete it.',
    levelArray = ['name of the database: ', 'name of admin user: ', 'name of public user: ', 'Are you sure you want to delete the whole database? (yes, any other words mean NO): '],
    retFunc = function(answers){
      if(answers[3]=='yes'){
        if (liveArray.indexOf(answers[0])!== -1){
          connection.query('DROP DATABASE '+answers[0]);
          connection.query('DROP USER "'+answers[1]+'"@"localhost"');
          connection.query('DROP USER "'+answers[2]+'"@"localhost"');
        }
      } else {
        console.log('There is no database with the specified name.');
      }
      status = 'loggedOn';
      init();
    };
    form(formName, levelArray, retFunc);
  },
  useDB = function(){
    var
    formName = 'use a database',
    levelArray = ['name of the database: '],
    retFunc = function(answers){
      connection.query('USE '+answers[0]);
      liveDB = answers[0];
      status = 'usingDB';
      init();
    };
    form(formName, levelArray, retFunc);
  },
  showTables = function(){
    connection.query('SHOW TABLES', function(err, result){
      if (err) {
        console.error('Unable to show databases.');
        return;
      }
      liveTable = null;
      liveArray = [];
      if(liveDB){
        for(var i in result){
          liveArray.push(result[i]['Tables_in_'+liveDB]);
        }
      }
      console.log('\ntables in '+liveDB+':\n');
      console.log(liveArray);
      status = 'tablesShown';
      init();
    });
  },
  tablesShown = function(){
    var
    formName = 'which one do you want?\na)add a table\nb)delete a table\nc)use a table\nd)want more or less...\ne)back to list of databases\nf)exit',
    levelArray = ['Write the letter only: '],
    retFunc = function(answers){
      switch (answers[0]){
        case 'a':
          status = 'wantsToAddTable';
          init();
        break;
        case 'b':
          status = 'wantsToDeleteTable';
          init();
        break;
        case 'c':
          status = 'wantsToUseTable';
          init();
        break;
        case 'd':
          status = 'wantMore';
          init();
        break;
        case 'e':
          status = 'loggedOn';
          init();
        break;
        case 'f':
          status = 'wantsToExit';
          init();
        break;
        default:
          status = 'usingDB';
          init();
        break;
      }
    };
    form(formName,levelArray,retFunc);
  },
  wantMore = function(){
    var
    formName = 'want more or less? hit "close" and use "mysql -u [your username] -p" and use professional codes.',
    levelArray = ['> '],
    retFunc = function(answers){
      if(answers[0] == 'close'){
        status = 'wantsToExit';
        init();
      } else {
        status = 'loggedOn';
        init();
      }
    };
    form(formName, levelArray, retFunc);
  },
  addTable = function(){
    connection.query('CREATE TABLE '+tableName+' (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT)');
  },
  deleteTable = function(db,tableName){
    var
    formName = 'delete table',
    levelArray = ['name of the table you want to delete: ', 'Are you sure you want to delete the table named above? (yes, any other words mean NO): '],
    retFunc = function(answers){
      if (answers[1]=== 'yes'){
        connection.query('DROP TABLE '+answers[0], function(err){
          if (err) console.log('cannot delete table '+answers[0]);
        });
      }
        status = 'usingDB';
        init();
    };
    form(formName,levelArray,retFunc);
  },
  useTable = function(){
    var
    formName = 'use a table',
    levelArray = ['name of the table you want to use: '],
    retFunc = function(answers){
      liveTable = answers[0];
      status = 'usingTable';
      init();
    };
    form(formName,levelArray,retFunc);
  },
  showFields = function(){
    connection.query('DESCRIBE '+liveTable, function(err, result){
      if (err) {
        console.error('Unable to show the fields of '+liveTable+'.');
        return;
      }
      liveArray = [];
      if(liveTable){
        liveArray = result;
      }
      console.log('\nfields in '+liveTable+':\n');
      console.log('|Field               |Type       |Null|Key|Default|Extra          |');
      for (var i in liveArray){
        console.log('|'+liveArray[i].Field+spaces[20-liveArray[i].Field.length]+'|'+liveArray[i].Type+spaces[11-stringify(liveArray[i].Type).length]+'|'+liveArray[i].Null+spaces[4-stringify(liveArray[i].Null).length]+'|'+liveArray[i].Key+spaces[3-stringify(liveArray[i].Key).length]+'|'+liveArray[i].Default+spaces[7-stringify(liveArray[i].Default).length]+'|'+liveArray[i].Extra+spaces[15-stringify(liveArray[i].Extra).length]+'|');
      }
      status = 'fieldsShown';
      init();
    });
  },

  addForignKey = function() {

  },

  dropForeignKey = function() {

  },
  init = function(){
    switch (status){
      case 'loggedOff':
        login();
      break;
      case 'loggedOn':
        showDBs();
      break;
      case 'showDBsDone':
        showDBsForm();
      break;
      case 'wantsToDeleteDB':
        deleteDB();
      break;
      case 'wantsToAddDB':
        addDB();
      break;
      case 'wantsToUseDB':
        useDB();
      break;
      case 'wantsToExit':
        logout();
      break;
      case 'usingDB':
        showTables();
      break;
      case 'wantMore':
        wantMore();
      break;
      case 'tablesShown':
        tablesShown();
      break;
      case 'wantsToAddTable':
        addTable();
      break;
      case 'wantsToDeleteTable':
        deleteTable();
      break;
      case 'wantsToUseTable':
        useTable();
      break;
      case 'usingTable':
        showFields();
      break;
      case 'fieldsShown':
        logout();
      break;
    }
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
  return {init: init};
})().init();
