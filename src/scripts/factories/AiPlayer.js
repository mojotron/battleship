import GameBoard from './GameBoard';

const AiPlayer = () => {
  const playerBoard = GameBoard();
  playerBoard.createAndPlaceShips();
  const availableAttacks = Array.from({ length: 100 }, (_, i) => i);

  const attack = () => {
    if (availableAttacks.length === 0) return -1;
    const index = Math.floor(Math.random() * availableAttacks.length);
    const attackPosition = availableAttacks.splice(index, 1);
    return attackPosition.pop();
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

    attack,
    receiveAttack,
    allSunk,
  };
};

export default AiPlayer;
