import Ship from '../scripts/factories/Ship';

describe('Ship is created with to arguments type and length', () => {
  test('If ship type is not valid throw error', () => {
    expect(() => Ship('spaceship', [])).toThrowError('☢️ Invalid ship type');
  });

  test('If ship type is valid pass the test', () => {
    expect(() => Ship('battleship', [])).not.toThrowError(
      '☢️ Invalid ship type'
    );
  });

  test('Ship type is valid but in uppercase', () => {
    expect(() => Ship('CARRIER', [])).not.toThrowError('☢️ Invalid ship type');
  });

  test('Ship type is valid but has space', () => {
    expect(() => Ship(' Patrol ', [])).not.toThrowError('☢️ Invalid ship type');
  });
});

describe('Ship type has specific length, position array passed is wrong length throw error', () => {
  test('ship length is invalid for current type', () => {
    expect(() => Ship('submarine', [0, 1, 2, 4])).toThrowError(
      '☢️ Invalid position length for ship type'
    );
    expect(() => Ship('submarine', [0, 1])).toThrowError(
      '☢️ Invalid position length for ship type'
    );
    expect(() => Ship('battleship', [0, 1, 2, 4, 5])).toThrowError(
      '☢️ Invalid position length for ship type'
    );
    expect(() => Ship('battleship', [0, 1, 2])).toThrowError(
      '☢️ Invalid position length for ship type'
    );
  });

  test('ship length is valid for current type', () => {
    expect(() => Ship('battleship', [0, 1, 2, 4])).not.toThrowError(
      '☢️ Invalid position length for ship type'
    );
    expect(() => Ship('destroyer', [0, 1, 2])).not.toThrowError(
      '☢️ Invalid position length for ship type'
    );
    expect(() => Ship('submarine', [0, 1, 3])).not.toThrowError(
      '☢️ Invalid position length for ship type'
    );
    expect(() => Ship('patrol', [0, 1])).not.toThrowError(
      '☢️ Invalid position length for ship type'
    );
  });
});

describe('hit method for updating ships state.isHit variable', () => {
  test('Invalid position passed in', () => {
    const ship = Ship('battleship', [0, 1, 2, 3]);
    expect(() => ship.hit(5)).toThrowError('☢️ Invalid position value');
  });
  test('Valid position passed in', () => {
    const ship = Ship('carrier', [0, 1, 2, 3, 4]);
    expect(ship.hit(2)).toBe(true);
  });
  test('Position passed in already been hit', () => {
    const ship = Ship('destroyer', [0, 1, 2]);
    ship.hit(1);
    expect(() => ship.hit(1)).toThrowError('☢️ Position already got hit');
  });
});

describe('ship sunken, all position has isHit flag = true', () => {
  test('Ship is not sunken', () => {
    const ship = Ship('battleship', [0, 1, 2, 3]);
    ship.hit(0);
    ship.hit(3);
    ship.hit(2);
    expect(ship.isSunk()).toBe(false);
  });
  test('Ship is sunken', () => {
    const ship = Ship('submarine', [0, 1, 2]);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBe(true);
  });
});
