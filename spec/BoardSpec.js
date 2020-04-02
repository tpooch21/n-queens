describe('Board', function() {

  var capitalize = function(word) {
    return word[0].toUpperCase() + word.slice(1);
  };


  var verifyConflictTypes = function(expectedConflicts, matrix) {
    // The Board() constructor will accept a matrix and build that into a (Backbone) Board object (as defined in Board.js)
    var board = new Board(matrix);
    _.map('row col rooks majorDiagonal minorDiagonal queens'.split(' '), function(conflictType) {
      var conflictDetected = board['hasAny' + capitalize(conflictType) + 'Conflicts']();
      var conflictExpected = _(expectedConflicts).contains(conflictType);
      var message = conflictExpected ? 'should' : 'should not';

      it(message + ' find a ' + conflictType + ' conflict', function() {
        expect(conflictDetected).to.be.equal(conflictExpected);
      });
    });
  };

  describe('Empty board', function() {
    verifyConflictTypes([''], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with minor diagonal conflict', function() {

    it('should return true for hasMinorDiagonalConflict', function() {
      var testBoard = new Board({n: 4});
      testBoard.togglePiece(0, 3);
      testBoard.togglePiece(1, 2);
      expect(testBoard.hasMinorDiagonalConflictAt(3, 0)).to.be.true;
    });

  });

  describe('Board with row conflicts', function() {
    verifyConflictTypes(['row', 'rooks', 'queens'], [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with col conflicts', function() {
    verifyConflictTypes(['col', 'rooks', 'queens'], [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with major diagonal conflicts', function() {
    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);

    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0]
    ]);
  });

  describe('Board with minor diagonal conflicts', function() {
    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);

    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ]);
  });
});
