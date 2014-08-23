/**
 * Hosein'sSQL Database
 */
(function(undef){
  var
  /**
   * main database function
   */
  hsdatabase = function(){
    this.tables = {};
  },

  typeDetector = function(a){
    //difference between array and object is that array has a length but strings have length too
    //if a variable was a date it is instanceof Date
    //if a variable was a string it has a match function in its prototypes
    //if a variable was a number typeof it is "number" but typeof NaN is "number" too
    //typeof boolean and function are defined
    //typeof null is object
    if(isNaN(a) || a === null || a === undef || !isFinite(a)){
      return "unusual";
    }
    if(typeof a =="string"){
      return "string";
    }
    if(typeof a =="object" && a.length){
      return "array";
    }
    if(typeof a =="object" && a instanceof Date){
      return "date";
    }
    if(typeof a =="object" && !a.length && a !== null){
      return "object";
    }
    if(typeof a =="boolean"){
      return "boolean";
    }
    if(typeof a =="function"){
      return "function";
    }
    if(typeof a =="number" && !isNaN(a)){
      return "number";
    }
  }
  ;

  /**
   * tables inside the database
   */
  hsdatebase.table = function(){
    this.rows = [];
  };

  /**
   * main selector function
   * @param  {string} table the table which the data is selected from
   * @param  {object} info  information for the selection
   */
  hsdatabase.prototype.select = function(table, info) {
    // body...
  };

  /**
   * the function to creat a new empty table in the database
   * @param  {string} tablename table's name
   */
  hsdatabase.prototype.addTable = function(tablename) {
    // body...
  };
})();