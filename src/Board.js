// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict




    // hasRowConflictAt:
    //  use .get() to get the row at rowIndex
    //  create a counter var
    //  iterate over the row
    //    if row[i] is equal to 1 then increase the counter by 1
    //    if counter is greater than 1 then return true
    //  return false
    //

    /*
      hasAnyRowConflicts:
          var rows = this.rows();
          iteratate over the rows
            if this.hasRowConflictAt(i) then return true;
          return false;
    */

    // [0, 0, 1]
    // [0, 1, 1]
    // [0, 0, 1]

    //

    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      debugger;
      var counter = 0;
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }

      return false; // fixme
    },



    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    /*
      hasColConflictAt:
        var rows = this.rows();
        var counter = 0;
        go over the rows check each row at colIndex
        if rows[i][colIndex] is 1 then increase the counter
        if counter is greater than 1 then return true


        return false if reach this line
    */
    hasColConflictAt: function(colIndex) {
      var rows = this.rows();
      var counter = 0;
      // Iterate over each row at colIndex
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][colIndex] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }

      return false;
    },

    // test if any columns on this board contain conflicts
    /*
      hasAnyColConflicts:
        iterate from 0 to n-1
          call hasColConflictAt(i) if it's true return true
        return false;
    */
    hasAnyColConflicts: function() {
      // Iterate from 0 to n-1 to check each column for conflicts, using rows.length as n-1
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    /*
      hasMajorDiagonalConflictAt:
        var rows = this.rows();
        var counter = 0;
        iterate over rows starting at i = 0
          check if rows[i][majorDiagonalColumnIndexAtFirstRow] is 1 then increase the counter
          increase majorDiagonalColumnIndexAtFirstRow
          increase i
        if counter is greater than 1 then return true

        return false

        var rows = this.rows();
        var counter = 0;
        iterate over rows starting at i = rowIndex
          check if rows[i][mahorDiagonalColumnIndex] is 1
          increase majorDiagonalColmnIndex
          increase i

        return false

    */
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow, rowIndex) {
      var rows = this.rows();
      var counter = 0;
      for (var i = rowIndex; i < rows.length; i++) {
        if (rows[i][majorDiagonalColumnIndexAtFirstRow] === 1) {
          counter++;
        }
        majorDiagonalColumnIndexAtFirstRow++;
        if (counter > 1) {
          return true;
        }
      }
      return false; // fixme
    },


    /*
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0]
    */
    /*
      hasAnyMajorDiagonalConflicts:
        var rows = this.rows();
        iterate i from 0 to n-1
          call hasMajorDiagonalConflictAt(i);
          if true return true

        iterate j from 1 to n-1
          call hasMajorDiagonalConflictAt(0, j);
          if true return true

        return false;
    */

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        // Use rows.length to iterate over columns
        for (var j = 0; j < rows.length; j++) {
          if (this.hasMajorDiagonalConflictAt(j, i)) {
            return true;
          }
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict

    /*
      hasMinorDiagonalConflictAt:
        var rows = this.rows();
        var counter = 0;
        iterate over rows starting at i = rowIndex
          check if rows[i][minorDiagonalColumnIndexAtFirstRow] is 1
          decrease minorDiagonalColumnIndexAtFirstRow
          increase i

        return false


    */
    /*
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [1, 0, 1, 0]
    */

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow, rowIndex) {
      var rows = this.rows();
      var counter = 0;
      for (var i = rowIndex; i < rows.length; i++) {
        if (rows[rowIndex][minorDiagonalColumnIndexAtFirstRow] === 1) {
          counter++;
        }
        minorDiagonalColumnIndexAtFirstRow--;
        if (counter > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts

    /*
    hasAnyMinorDiagonalConflicts:
        var rows = this.rows();

        for (var i = 0; i < rows.length; i++) {
          if (i === 0) {
            for (var j = row[0].length - 1; j >= 0; j--) {
              if (hasMinorDiagonalConflict(j, i)) {
                return true;
              }
            }
          } else {
            if (hasMinorDiagonalConflict(row.length - 1, i)) {
              return true;
            }
          }

        return false;

    */
    hasAnyMinorDiagonalConflicts: function() {
      for (var i = 0; i < this.rows().length; i++) {
        for (var j = 0; j < this.rows().length; j++) {
          if (this.hasMinorDiagonalConflictAt(j, i)) {
            return true;
          }
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
