import Player from '../scripts/factories/Player';

describe('Player factory', () => {
  describe('human player', () => {
    let player;

    beforeEach(() => {
      player = Player('bob');
    });

    test('create new player with player name or default player1', () => {
      const player2 = Player('Toby The Red');
      expect(player.nameId).toBe('bob');
      expect(player2.nameId).toBe('Toby The Red');
    });

    test('get current board state', () => {
      const fakeBoard = Array.from({ length: 100 }, () => ({
        hasShip: false,
        isHit: false,
        shipId: null,
      }));
      expect(player.board).toEqual(fakeBoard);
    });

    test('place ship horizontally valid position', () => {
      player.createShip(0, 'horizontal', 'battleship');
      expect(player.board[0].shipId).toBe('battleship');
      expect(player.board[1].shipId).toBe('battleship');
      expect(player.board[2].shipId).toBe('battleship');
      expect(player.board[3].shipId).toBe('battleship');
      expect(player.board[4].shipId).toBe(null);
    });

    test('place ship horizontally invalid position', () => {
      player.createShip(0, 'horizontal', 'battleship');

      expect(() =>
        player.createShip(0, 'horizontal', 'battleship')
      ).toThrowError('☢️ Invalid ship placement, ship type already on board');

      expect(() =>
        player.createShip(2, 'horizontal', 'submarine')
      ).toThrowError('☢️ Invalid ship position, colliding with another ship');

      expect(() =>
        player.createShip(8, 'horizontal', 'submarine')
      ).toThrowError('☢️ Invalid horizontal placement, outside row');
    });

    test('place ship vertically valid position', () => {
      player.createShip(0, 'vertical', 'battleship');
      expect(player.board[0].shipId).toBe('battleship');
      expect(player.board[10].shipId).toBe('battleship');
      expect(player.board[20].shipId).toBe('battleship');
      expect(player.board[30].shipId).toBe('battleship');
      expect(player.board[40].shipId).toBe(null);
    });

    test('place ship vertically invalid position', () => {
      player.createShip(0, 'vertical', 'battleship');

      expect(() =>
        player.createShip(0, 'horizontal', 'battleship')
      ).toThrowError('☢️ Invalid ship placement, ship type already on board');

      expect(() =>
        player.createShip(20, 'horizontal', 'submarine')
      ).toThrowError('☢️ Invalid ship position, colliding with another ship');

      expect(() => player.createShip(80, 'vertical', 'submarine')).toThrowError(
        '☢️ Invalid vertical placement, outside column'
      );
    });
    // attack enemy
    test('attack enemy', () => {
      expect(player.attack(15)).toBe(15);
    });
  });
});
