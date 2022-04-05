import GameBoard from '../scripts/factories/GameBoard';

describe('GameBoard factory function', () => {
  let board;

  beforeEach(() => {
    board = GameBoard();
  });

  test('board creation', () => {
    const fakeBoard = Array.from({ length: 100 }, () => ({
      hasShip: false,
      isHit: false,
      shipId: null,
    }));

    expect(board.board).toEqual(fakeBoard);
    expect(board.board).not.toBe(fakeBoard);
  });

  test('place ship, board positions has hasShip flag', () => {
    const shipType = 'battleship';
    const shipPosition = [0, 1, 2, 3];
    board.addShip(shipType, shipPosition);
    expect(shipPosition.every(pos => board.board[pos].hasShip === true)).toBe(
      true
    );
    expect(
      shipPosition.every(pos => board.board[pos].shipId === shipType)
    ).toBe(true);
  });

  test.todo('trying to place ship on top of  another ship');

  test.todo('trying to place ship outside boundaries horizontally');

  test.todo('trying to place ship outside boundaries vertically');

  test.todo('place all 5 ships randomly without collision or boundaries error');

  test('attack that misses ship', () => {
    board.addShip('submarine', [0, 1, 2]);
    board.attack(3);
    expect(board.board[3].isHit).toBe(true);
    expect(board.board[3].hasShip).toBe(false);
  });

  test.todo('attack that hits ship');

  test.todo('attack to cell that is already hit');

  test.todo('attack to outside boundaries');

  test.todo('all ship sunken');
});
