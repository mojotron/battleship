import GameBoard from '../scripts/factories/GameBoard';

describe('Creating new GameBoard object', () => {
  xtest('create empty board with 100 cells', () => {
    const board = GameBoard();
    expect(board.state.length).toBe(100);
  });

  xtest('board cell is object {isHit: false, hasShip: false}', () => {
    const board = GameBoard();
    const cells = board.state.every(
      ele => ele.isHit === false && ele.hasShip === false
    );
    expect(cells).toBe(true);
  });
});

describe('Add ship method', () => {
  xtest('pass ship object and positions array', () => {
    const board = GameBoard();
    board.addShip({}, [0, 1, 2, 3]);
    expect().toBe();
  });

  xtest('test is ship places on correct position', () => {
    const board = GameBoard();
    const shipPosition = [0, 1, 2, 3];
    board.addShip({}, shipPosition);
    const boardShipPosition = shipPosition.every(
      pos => board.getState()[pos].hasShip === true
    );
    expect(boardShipPosition).toBe(true);
  });

  // xtest('return error if ships collide');
  // xtest('return error if ship is place outside');
  // xtest('check vertical placement');
  // xtest('check horizontal placement');
  // xtest('return error if ship is not placed vertically or horizontally');
});

// describe('Get board state', () => {
//   xtest('cant change state outside of class');
//   xtest('return correct state for 1 ship');
//   xtest('return correct state for all 5 ships');
//   xtest('return correct state for missed fire');
//   xtest('return correct position for damaged ships');
// });

// describe('receiveAttack method', () => {
//   xtest('update state for attack');
//   xtest('pass position to corresponding ship');
//   xtest('keep track of all missed shoots');
// });

// describe('All ships sunken', () => {
//   xtest('check if all ships are sunken');
// });
