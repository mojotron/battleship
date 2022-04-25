import GameBoard from './GameBoard';
import SearchAndSink from './SearchAndSink';
import { shuffle } from '../halpers';

const AiPlayer = () => {
  const playerBoard = GameBoard();
  playerBoard.createAndPlaceShips();
  const availableAttacks = shuffle(...Array.from({ length: 100 }, (_, i) => i));
  const detectedShips = [];

  const attackReport = (shipId, position, sunk) => {
    console.log('REPORT: ', shipId, position, sunk);
    if (
      detectedShips.length > 0 &&
      (shipId === null || detectedShips.at(0).getShipId() !== shipId)
    ) {
      detectedShips.at(0).changeDirection();
    }
    if (sunk) {
      const index = detectedShips.findIndex(ele => ele.getShipId() === shipId);
      detectedShips.splice(index, 1);
      return;
    }
    if (detectedShips.some(ele => ele.getShipId() === shipId)) return;
    if (shipId) detectedShips.push(SearchAndSink(shipId, position));
    console.log(detectedShips);
  };

  const randomAttack = () => {
    if (availableAttacks.length === 0) return -1;
    return availableAttacks.pop();
  };

  const attack = () => {
    console.log(availableAttacks);
    if (detectedShips.length === 0) return randomAttack();

    const position = detectedShips.at(0).search();
    console.log('search pos: ', position);
    const index = availableAttacks.some(ele => ele === position);
    console.log(index);
    if (!index) {
      detectedShips.at(0).changeDirection();
      return attack();
    }
    availableAttacks.splice(
      availableAttacks.findIndex(ele => ele === position),
      1
    );
    console.log(position);
    return position;
  };

  const receiveAttack = position => {
    playerBoard.attack(position);
  };

  const allSunk = () => playerBoard.allSunk();

  return {
    get board() {
      return playerBoard.board.map(cell => ({ ...cell }));
    },

    get availableAttacks() {
      return [...availableAttacks];
    },

    attackReport,
    attack,
    receiveAttack,
    allSunk,
  };
};

export default AiPlayer;
