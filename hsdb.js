/**
 * Hosein'sSQL Database
 */
(function(){
  var
  /**
   * main database function
   */
  hsdatabase = function(){
    this.tables = {};
  };

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
  hsdatabase.prototype.addtable = function(tablename) {
    // body...
  };
})();