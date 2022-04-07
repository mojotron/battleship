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
    board.placeShip(shipType, shipPosition);
    expect(shipPosition.every(pos => board.board[pos].hasShip === true)).toBe(
      true
    );
    expect(
      shipPosition.every(pos => board.board[pos].shipId === shipType)
    ).toBe(true);
  });

  test('place ship that already exists', () => {
    const shipType = 'submarine';
    board.placeShip(shipType, [0, 1, 2]);
    expect(() => board.placeShip(shipType, [5, 6, 7])).toThrowError(
      '☢️ Invalid ship placement, ship type already on board'
    );
  });

  test('trying to place ship on top of  another ship', () => {
    const shipPosition1 = [0, 1, 2, 3];
    const shipPosition2 = [1, 11, 21];
    board.placeShip('battleship', shipPosition1);
    expect(() => board.placeShip('submarine', shipPosition2)).toThrowError(
      '☢️ Invalid ship position, colliding with another ship'
    );
  });

  test('attack that misses ship', () => {
    board.placeShip('submarine', [0, 1, 2]);
    board.attack(3);
    expect(board.board[3].isHit).toBe(true);
    expect(board.board[3].hasShip).toBe(false);
  });

  test('attack that hits ship', () => {
    board.placeShip('destroyer', [0, 1, 2]);
    board.attack(2);
    expect(board.board[2].isHit).toBe(true);
    expect(board.board[2].hasShip).toBe(true);
  });

  test('attack to cell that is already hit', () => {
    board.placeShip('carrier', [0, 1, 2, 3, 4]);
    board.attack(2);
    expect(() => board.attack(2)).toThrowError(
      '☢️ Invalid attack, cell already attacked'
    );
  });

  test('attack to outside boundaries', () => {
    expect(() => board.attack(-3)).toThrowError(
      '☢️ Invalid attack, outside of board boundaries'
    );
    expect(() => board.attack(100)).toThrowError(
      '☢️ Invalid attack, outside of board boundaries'
    );
  });

  test('all ship sunken', () => {
    board.placeShip('patrol', [0, 1]);
    board.placeShip('submarine', [2, 3, 4]);
    board.attack(0);
    board.attack(1);
    board.attack(2);
    board.attack(3);
    expect(board.allSunk()).toBe(false);
    board.attack(4);
    expect(board.allSunk()).toBe(true);
  });

  test('place all 5 ships randomly without collision or boundaries error', () => {
    board.createAndPlaceShips();
    const ships = board.board.filter(c => c.hasShip).length;
    const carrier = board.board.filter(c => c.shipId === 'carrier').length;
    const battleship = board.board.filter(
      c => c.shipId === 'battleship'
    ).length;
    const destroyer = board.board.filter(c => c.shipId === 'destroyer').length;
    const submarine = board.board.filter(c => c.shipId === 'submarine').length;
    const patrol = board.board.filter(c => c.shipId === 'patrol').length;
    const restNum =
      board.board.length -
      carrier -
      battleship -
      destroyer -
      submarine -
      patrol;
    const rest = board.board.filter(c => !c.hasShip).length;
    expect(ships).toEqual(17);
    expect(carrier).toEqual(5);
    expect(battleship).toEqual(4);
    expect(destroyer).toEqual(3);
    expect(submarine).toEqual(3);
    expect(patrol).toEqual(2);
    expect(rest).toEqual(restNum);
  });
});
