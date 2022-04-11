import generatePositions from '../scripts/generate-positions';

describe('generate board position for ship placement', () => {
  test('start position not in board range', () => {
    expect(() =>
      generatePositions({ position: -1, boardSize: 3 })
    ).toThrowError('☢️ Invalid start position outside board range');
    expect(() => generatePositions({ position: 9, boardSize: 3 })).toThrowError(
      '☢️ Invalid start position outside board range'
    );
  });

  test('horizontal placement in first row', () => {
    const options = {
      position: 0,
      length: 3,
      boardSize: 5,
      direction: 'horizontal',
    };
    expect(generatePositions(options)).toEqual([0, 1, 2]);
  });
  test('horizontal placement in some middle row', () => {
    const options = {
      position: 128,
      length: 5,
      boardSize: 15,
      direction: 'horizontal',
    };
    expect(generatePositions(options)).toEqual([128, 129, 130, 131, 132]);
  });
  test('horizontal placement in last row', () => {
    const options = {
      position: 92,
      length: 4,
      boardSize: 10,
      direction: 'horizontal',
    };
    expect(generatePositions(options)).toEqual([92, 93, 94, 95]);
  });

  test('vertical placement in first column', () => {
    const options = {
      position: 0,
      length: 3,
      boardSize: 5,
      direction: 'vertical',
    };
    expect(generatePositions(options)).toEqual([0, 5, 10]);
  });
  test('vertical placement in some middle column', () => {
    const options = {
      position: 48,
      length: 5,
      boardSize: 15,
      direction: 'vertical',
    };
    expect(generatePositions(options)).toEqual([48, 63, 78, 93, 108]);
  });
  test('vertical placement in last column', () => {
    const options = {
      position: 49,
      length: 4,
      boardSize: 10,
      direction: 'vertical',
    };
    expect(generatePositions(options)).toEqual([49, 59, 69, 79]);
  });

  test('invalid horizontal placement outside first row', () => {
    const options = {
      position: 49,
      length: 4,
      boardSize: 10,
      direction: 'horizontal',
    };
    expect(() => generatePositions(options)).toThrowError(
      '☢️ Invalid horizontal placement, outside row'
    );
  });

  test('invalid horizontal placement outside some middle row', () => {
    const options = {
      position: 147,
      length: 4,
      boardSize: 15,
      direction: 'horizontal',
    };
    expect(() => generatePositions(options)).toThrowError(
      '☢️ Invalid horizontal placement, outside row'
    );
  });

  test('invalid horizontal placement outside last row', () => {
    const options = {
      position: 99,
      length: 4,
      boardSize: 10,
      direction: 'horizontal',
    };
    expect(() => generatePositions(options)).toThrowError(
      '☢️ Invalid horizontal placement, outside row'
    );
  });

  test('invalid vertical placement outside first column', () => {
    const options = {
      position: 5,
      length: 5,
      boardSize: 5,
      direction: 'vertical',
    };
    expect(() => generatePositions(options)).toThrowError(
      '☢️ Invalid vertical placement, outside column'
    );
  });

  test('invalid vertical placement outside some middle column', () => {
    const options = {
      position: 175,
      length: 5,
      boardSize: 15,
      direction: 'vertical',
    };
    expect(() => generatePositions(options)).toThrowError(
      '☢️ Invalid vertical placement, outside column'
    );
  });

  test('invalid vertical placement outside last column', () => {
    const options = {
      position: 99,
      length: 4,
      boardSize: 10,
      direction: 'vertical',
    };
    expect(() => generatePositions(options)).toThrowError(
      '☢️ Invalid vertical placement, outside column'
    );
  });
});
