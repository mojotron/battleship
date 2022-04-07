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
      state.ships[state.board[position].shipId].hit(position);
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
      if (state.ships[type]) return;
      // create random number 0-99
      // TODO make range
      const position = Math.floor(Math.random() * 100) - SHIPS[type].length;
      // check if there is ship
      if (state.board[position].hasShip) generateShip(type);
      const randNum = Math.random();
      // randomize direction
      const directions =
        randNum > 0.5 ? ['horizontal', 'vertical'] : ['vertical', 'horizontal'];
      // try to put to direction 1
      const positionsA = generatePositions({
        position,
        length: SHIPS[type].length,
        boardSize: 10,
        direction: directions[0],
      });
      if (positionsA) {
        placeShip(type, positionsA);
        return;
      }
      // try to put to direction 2
      const positionsB = generatePositions({
        position,
        length: SHIPS[type].length,
        boardSize: 10,
        direction: directions[1],
      });
      if (Array.isArray(positionsB)) {
        placeShip(type, positionsB);
        return;
      }
    } catch (error) {
      // try again
      console.log(error.message);
      if (!state.ships[type]) generateShip(type);
    }
  };

  const createAndPlaceShips = () => {
    // TODO ship types to config
    const types = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol'];
    // TODO only ships not in object state ships
    types.forEach(type => generateShip(type));
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
