import Ship from '../scripts/factories/Ship';

describe('Ship factory tests', () => {
  // test ship creation
  test('Create ship with invalid ship type', () => {
    expect(() => Ship('spaceship', [0, 1, 2, 3])).toThrowError(
      'Invalid ship type'
    );
  });

  test('Create ship with invalid position length', () => {
    expect(() => {
      Ship('patrol', [0, 1, 2, 3]);
    }).toThrowError('Invalid ship position length');
  });

  test('Create valid ship => carrier', () => {
    const carrier = Ship('carrier', [0, 1, 2, 3, 4]);
    expect(carrier.getType()).toBe('carrier');
  });

  test('Create valid ship => submarine', () => {
    const carrier = Ship('submarine', [2, 3, 4]);
    expect(carrier.getType()).toBe('submarine');
  });

  // test if ship hit function
  test('Ship hit return true', () => {
    const ship = Ship('carrier', [6, 7, 8, 9, 10]);
    expect(ship.hit(8)).toBe(true);
  });

  test('Ship already hit on position', () => {
    const submarine = Ship('submarine', [0, 10, 20]);
    submarine.hit(0);

    expect(() => {
      submarine.hit(0);
    }).toThrowError('Position already got hit');
  });

  test('Ship hit invalid value return false', () => {
    const ship = Ship('carrier', [6, 7, 8, 9, 10]);
    expect(() => {
      ship.hit(11);
    }).toThrowError('Invalid position value');
  });

  // test ship isSunk method
  test("Ship is not sunken, all position isHit property aren't set to true", () => {
    const submarine = Ship('submarine', [0, 10, 20]);
    submarine.hit(0);
    submarine.hit(20);
    expect(submarine.isSunk()).toBe(false);
  });

  test('Ship is sunken, all position got isHit property set to true', () => {
    const submarine = Ship('submarine', [0, 10, 20]);
    submarine.hit(0);
    submarine.hit(10);
    submarine.hit(20);
    expect(submarine.isSunk()).toBe(true);
  });
});
