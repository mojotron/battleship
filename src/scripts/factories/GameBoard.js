const GameBoard = () => {
  let boardState;
  const ships = [];

  const init = () => {
    state = Array.from({ length: 100 }, () => ({
      isHit: false,
      hasShip: false,
    }));
  };

  const addShip = (shipObj, positionArr) => {
    ships.push(shipObj);
    positionArr.forEach(position => {
      state[position].hasShip = true;
    });
  };

  // const getShips = () => [...ships];

  init();

  return {
    getState,
    addShip,
    // return copy of state without reference to heap
    get state() {
      return boardState.map(ele => ({ ...ele }));
    },
  };
};

export default GameBoard;
