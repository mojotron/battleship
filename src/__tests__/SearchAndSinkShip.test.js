import SearchAndSink from '../scripts/factories/SearchAndSink';

describe('Find all ship cells and sink it', () => {
  // const shipPositions = [{ hasShip: false, isHit: false, shipId: null }];
  test('test creation', () => {
    const obj = SearchAndSink('battleship', 20);
    expect(obj.getShipId()).toBe('battleship');
  });
  test('search for ship horizontally left to right', () => {
    const obj = SearchAndSink('battleship', 20);
    const position = obj.search();
    expect([21, 19, 10, 30].includes(position)).toBe(true);
  });

  test('attack report return 1 if ship is sunk', () => {
    const obj = SearchAndSink('battleship', 20);
    expect(obj.attackReport('battleship', 30, true)).toBe(1);
  });
});
