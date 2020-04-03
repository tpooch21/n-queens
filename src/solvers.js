/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var board = new Board({n: n});
  var rows = board.rows();
  // board.togglePiece(0, 0);
  var row = 0;

  var putRookInRow = function(x, r) {
    if (x === 0) {
      solution = board;
      return;
    } else {

      for (var i = 0; i < rows.length; i++) {
        // Toggle piece, and then check for conflicts
        board.togglePiece(r, i);
        // If no conflicts, then call putRookInRow on next piece, next row
        if (!(board.hasAnyRooksConflicts())) {
          putRookInRow(x - 1, r + 1);
        }
        // When jumping back out of inner function calls, check if there's a solution in place, and break loop if so
        if (solution) {
          break;
        }
        board.togglePiece(r, i);
      }
      return;
    }
  };

  putRookInRow(n, row);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

// Time complexity: O(n^2)g
window.countNRooksSolutions = function(n) {

  var board = new Board({n: n});
  var rows = board.rows();
  var row = 0;
  var solutionCount = 0;
  var occupiedColumns = {};

  var putRookInRow = function(x, r) {
    if (x === 0) {
      solutionCount++;
      return;
    }

    for (var col = 0; col < rows.length; col++) {
      // If column is occupied, continue to next column
      if (occupiedColumns[col]) {
        continue;
      }

      // If column is not occupied, toggle piece
      board.togglePiece(r, col);
      occupiedColumns[col] = 1;

      // No need to check for conflicts, since every recursive call to putRookInRow takes place on a new row
      // and col is not in occupiedColumns
      putRookInRow(x - 1, r + 1);

      board.togglePiece(r, col);
      delete occupiedColumns[col];
    }

    return;

  };

  putRookInRow(n, row);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  var board = new Board({n: n});
  var rows = board.rows();
  var row = 0;


  var placeQueen = function(x, r) {
    if (x === 0) {
      solution = board;
      return;
    }
    // Iterate over columns in given row and check for conflicts after placement
    for (var i = 0; i < rows.length; i++) {
      board.togglePiece(r, i);

      // If no conflicts on current board, call placeQueen on next row
      if (!(board.hasAnyQueensConflicts())) {
        placeQueen(x - 1, r + 1);
      }
      if (solution) {
        break;
      }
      board.togglePiece(r, i);
    }

    return;
  };

  // Call placeQueen on initial n value, and row 0
  placeQueen(n, row);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  // If there's no solution, return a board with all 0's
  if (!solution) {
    solution = new Board({n: n});
  }
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  var board = new Board({n: n});
  var rows = board.rows();
  var row = 0;
  var occupiedColumns = {};

  var checkQueens = function(x, r) {
    // Define base case, when no queens left to place
    if (x === 0) {
      // Placed all queens, meaning no conflicts have risen
      solutionCount++;
      return;
    }

    // Iterate over columns in row r
    for (var col = 0; col < rows.length; col++) {
    // If column is occupied, continue
      if (occupiedColumns[col]) {
        continue;
      }

      board.togglePiece(r, col);
      occupiedColumns[col] = 1;

      // Check for diagonal conflicts
      if (!(board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts())) {
        checkQueens(x - 1, r + 1);
      }

      // When checkQueens returns (or board has diag conflicts), check next col in row
      board.togglePiece(r, col);
      delete occupiedColumns[col];
    }

    return;
  };

  checkQueens(n, row);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
