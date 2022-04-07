const generatePositions = options => {
  // TODO how to pass options
  if (
    options.position < 0 ||
    options.position > options.boardSize * options.boardSize - 1
  ) {
    throw new Error('☢️ Invalid start position outside board range');
  }
  if (options.direction === 'horizontal') {
    const rowIndex = Math.floor(options.position / options.boardSize);
    const rowMaxValue = rowIndex * options.boardSize + options.boardSize - 1;
    if (options.position + options.length > rowMaxValue)
      throw new Error('☢️ Invalid horizontal placement, outside row');
  }

  if (options.direction === 'vertical') {
    const columnIndex = options.position % options.boardSize;
    const columnMaxValue =
      (options.boardSize - 1) * options.boardSize + columnIndex;
    if (
      options.position + options.length * options.boardSize >
      columnMaxValue
    ) {
      throw new Error('☢️ Invalid vertical placement, outside column');
    }
  }

  const step = options.direction === 'horizontal' ? 1 : options.boardSize;

  return Array.from(
    { length: options.length },
    (_, i) => options.position + i * step
  );
};

export default generatePositions;
