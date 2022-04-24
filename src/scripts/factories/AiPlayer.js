import GameBoard from './GameBoard';
import SearchAndSink from './SearchAndSink';

const AiPlayer = () => {
  const playerBoard = GameBoard();
  playerBoard.createAndPlaceShips();
  const availableAttacks = Array.from({ length: 100 }, (_, i) => i);

  const detectedShips = [];

  const attackReport = (shipId, position, sunk) => {
    console.log('REPORT: ', shipId, position, sunk);
    if (detectedShips.some(ele => ele.getShipId() === shipId)) return;
    detectedShips.push(SearchAndSink(shipId, position));
    console.log(detectedShips);
  };

  const randomAttack = () => {
    if (availableAttacks.length === 0) return -1;
    const index = Math.floor(Math.random() * availableAttacks.length);
    const attackPosition = availableAttacks.splice(index, 1);
    return attackPosition.pop();
  };

  const attack = () => randomAttack();

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
