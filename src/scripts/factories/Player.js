import GameBoard from './GameBoard';
import generatePositions from '../generate-positions';
import { SHIPS } from '../config';

const Player = playerName => {
  const nameId = playerName;
  const playerBoard = GameBoard();

  const createShip = (position, direction, shipType) => {
    try {
      const positions = generatePositions({
        position,
        length: SHIPS[shipType].length,
        boardSize: 10,
        direction,
      });
      playerBoard.placeShip(shipType, positions);
    } catch (error) {
      throw error;
    }
  };

  const receiveAttack = position => {
    try {
      playerBoard.attack(position);
    } catch (error) {
      console.log(error);
    }
    // for better ai attack, this line is for the model aiAttack()
    const { shipId, sunk } = playerBoard.board[position];
    return { shipId, sunk };
  };

  const allSunk = () => playerBoard.allSunk();

  return {
    get nameId() {
      return nameId;
    },

    get board() {
      return playerBoard.board.map(cell => ({ ...cell }));
    },

    createShip,
    allSunk,
    receiveAttack,
  };
};

export default Player;
