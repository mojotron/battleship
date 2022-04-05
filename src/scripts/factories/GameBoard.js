const GameBoard = () => {
  const state = {
    board: [],
  };

  const addShip = (type, positions) => {
    // make ship
    positions.forEach(index => {
      state.board[index].hasShip = true;
      state.board[index].shipId = type;
    });
  };

  const attack = position => {
    state.board[position].isHit = true;
  };

  const init = () => {
    state.board = Array.from({ length: 100 }, () => ({
      hasShip: false,
      isHit: false,
      shipId: null,
    }));
  };
  init();

  return {
    get board() {
      return state.board.map(ele => ({ ...ele }));
    },
    addShip,
    attack,
  };
};

export default GameBoard;
