import GameBoard from '../scripts/factories/GameBoard';

describe('Creating new GameBoard object', () => {
  test('create empty board with 100 cells', () => {
    const board = GameBoard();
    expect(board.state.length).toBe(100);
  });

  test('board cell is object {isHit: false, hasShip: false}', () => {
    const board = GameBoard();
    const cells = board.state.every(
      ele => ele.isHit === false && ele.hasShip === false
    );
    expect(cells).toBe(true);
  });
});

describe('Add ship method', () => {
  test('pass ship object and positions array', () => {
    const board = GameBoard();
    board.addShip({}, [0, 1, 2, 3]);
    expect().toBe();
  });

  test('test is ship places on correct position', () => {
    const board = GameBoard();
    const shipPosition = [0, 1, 2, 3];
    board.addShip({}, shipPosition);
    const boardShipPosition = shipPosition.every(
      pos => board.getState()[pos].hasShip === true
    );
    expect(boardShipPosition).toBe(true);
  });

  test('return error if ships collide');
  test('return error if ship is place outside');
  test('check vertical placement');
  test('check horizontal placement');
  test('return error if ship is not placed vertically or horizontally');
});

describe('Get board state', () => {
  test('cant change state outside of class');
  test('return correct state for 1 ship');
  test('return correct state for all 5 ships');
  test('return correct state for missed fire');
  test('return correct position for damaged ships');
});

describe('receiveAttack method', () => {
  test('update state for attack');
  test('pass position to corresponding ship');
  test('keep track of all missed shoots');
});

describe('All ships sunken', () => {
  test('check if all ships are sunken');
});
