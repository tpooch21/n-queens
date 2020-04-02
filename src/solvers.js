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
//x

/* [ [1, 0, 0, 0],
     [0, 1, 0, 0],
     [0, 0, 1, 0],
     [0, 0, 0, 1]
   ]

   n = 4

   var solution;

   var board = new Board({n: n});
   var rows = board.rows;
   board.togglePiece(0, 0);
   var row = 0;

   Recursive inner function (accepts n, row):
      Base case: n = 0:
        Check if current board has row conflicts or column conflicts
        If false, solution = board

      n > 0
        var col;
        Iterate over column possibilities, check each row at that column for 1's

        // isFound stores boolean telling whether a valid combo has been found (defaults to true)
        var isFound = true;

        for (var j = 0; j < n; j++) {


        // UPDATED
        //  Iterate over columns
        //  Toggle piece row, col
        //    Check if there's a board conflict
        //      If no conflict, call recursive(n - 1, row + 1)
        //      If conflict, togglePiece again and continue
        //      If solution, return;




          // Reset isFound before every iteration
          isFound = true;

          for (var k = 0; k < rows.length; k++) {

          // If a row has a 1 at this column, isFound = false and we need to break
            if (rows[j][k] === 1) {
              isFound = false;
              break;
            }
          }
          if (isFound) {
            col = j;
            break;
          }
        }

        // If we find a valid place, togglePiece(row, col)
        // Then we need to check the board for conflicts
        // If the board has no conflicts, we can move onto the next function call(n - 1, row)


        // If a valid combination has been found, togglePiece(row, col)
        //    Then, call the recursive function with (n-1, row+1) as the argument
        // If no valid combination has been found,




*/

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
/*
counter = 0;

[
  [1,0]
  [1,0]

  [1,0]
  [0,1]
]

count = 1;
[ [1, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 1]
]

// Iterating over every column
// We would check each placement for conflicts
//  Jump in at n=0, increase solution counter
//  return
// Jump back out to where we called (n = 0)
// Toggle piece
// See if there is another column to check
// If there are no more columns, return;

// Then we'll be back at function call with n = 1
// Toggle piece
// Go through another iteration
//    Toggles piece
//    Call the function again with n = 1

// Back in another function call (bottom row)
// Toggle piece
// Check for conflicts
//   If there are none, we call function (n = 0)
//   Solutions += 1
//   Return
// Toggle piece (off)
// Goes to last column
//   Toggles piece (on)
//   Check, fail
// Toggle piece (off)
// Will finish for loop, and return;

// Now we're back in previous function call (third row)
//  Toggle piece (off)
//  Will try to iterate again, run out of columns
//  Return;

// Now we're back in row 2
//  Toggle piece (off)
//  Will check next column
//  Toggle piece (on)
//  This works, we call function on third row
[ [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
  putRookInRow(board, 2)

  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 0]

  putRookInRow(board, 1)

  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]

  toggleback
  toggleback

  [0, 1, 0, 0],
  [1, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]

  putRookInRow(board, 2)

putRookInRow(board, 2){

  for(every col in 3 row)
    newboard = clone board
    putRookInRow(newboard, 1)
}
*/
window.countNRooksSolutions = function(n) {

  var board = new Board({n: n});
  var rows = board.rows();
  var row = 0;
  var solutionCount = 0; //fixme

  var putRookInRow = function(x, r) {
    if (x === 0) {
      solutionCount++;
      return;
    }

    for (var col = 0; col < rows.length; col++) {
      board.togglePiece(r, col);
      if (!(board.hasAnyRooksConflicts())) {
        putRookInRow(x - 1, r + 1);
      }
      board.togglePiece(r, col);
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

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
