import Ship from './Ship';
import generatePositions from '../generate-positions';
import { SHIPS } from '../config';

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
      const shipType = state.board[position].shipId;
      // add hit position to ship object
      state.ships[shipType].hit(position);
      // check if ship is sunk if is add sunk true to every cell on board with ship type
      if (state.ships[shipType].isSunk()) {
        state.board.forEach(cell => {
          if (cell.shipId === shipType) {
            cell.sunk = true;
          }
        });
      }
    }
  };

  const allSunk = () => {
    for (const ship of Object.values(state.ships)) {
      if (ship.isSunk() === false) return false;
    }
    return true;
  };

  const generateShip = type => {
    try {
      const positions = generatePositions({
        position: Math.floor(Math.random() * 100),
        length: SHIPS[type].length,
        boardSize: 10,
        direction: Math.random() > 0.5 ? 'horizontal' : 'vertical',
      });
      placeShip(type, positions);
    } catch (error) {
      // try again if some error is thrown
      console.log(error.message);
      if (!state.ships[type]) generateShip(type);
    }
  };

  const createAndPlaceShips = () => {
    for (const shipType of Object.keys(SHIPS)) generateShip(shipType);
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
    placeShip,
    attack,
    allSunk,
    createAndPlaceShips,
  };
};

export default GameBoard;
