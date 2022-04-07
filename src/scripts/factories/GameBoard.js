import Ship from './Ship';

const GameBoard = () => {
  const state = {
    board: [],
    ships: {},
  };

  const checkShipCollision = positions =>
    positions.some(pos => state.board[pos].hasShip);

  const addShip = (type, positions) => {
    state.ships[type] = Ship(type, positions);
  };

  const placeShip = (type, positions) => {
    if (state.ships[type])
      throw new Error('☢️ Invalid ship placement, ship type already on board');

    if (checkShipCollision(positions))
      throw new Error('☢️ Invalid ship position, colliding with another ship');

    addShip(type, positions);

    positions.forEach(index => {
      state.board[index].hasShip = true;
      state.board[index].shipId = type;
    });
  };

  const attack = position => {
    if (position < 0 || position >= state.board.length)
      throw new Error('☢️ Invalid attack, outside of board boundaries');
    if (state.board[position].isHit)
      throw new Error('☢️ Invalid attack, cell already attacked');
    state.board[position].isHit = true;
    if (state.board[position].hasShip) {
      state.ships[state.board[position].shipId].hit(position);
    }
  };

  const allSunk = () => {
    for (const ship of Object.values(state.ships)) {
      if (ship.isSunk() === false) return false;
    }
    return true;
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
    get ships() {
      return state.ships.map(ele => ele.type);
    },
    placeShip,
    attack,
    allSunk,
  };
};

export default GameBoard;
