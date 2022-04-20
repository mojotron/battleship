import { SHIP_TYPES } from './config';
import Player from './factories/Player';
import AiPlayer from './factories/AiPlayer';

export const state = {
  ships: [],
  direction: '',
  player: {},
  enemy: {},
  lastPosition: {
    player: null,
    enemy: null,
  },
};

export const initState = direction => {
  state.ships = [...SHIP_TYPES];
  state.direction = direction;
  state.player = Player();
  state.enemy = AiPlayer();
};

export const shipsEmpty = () => state.ships.length === 0;

const popShip = () => {
  if (shipsEmpty()) return -1;
  return state.ships.pop();
};

export const addShip = position => {
  try {
    state.player.createShip(position, state.direction, popShip());
  } catch (error) {
    throw error;
  }
};

export const playerAttack = position => {
  state.enemy.receiveAttack(position);
  state.lastPosition.enemy = position;
};

export const aiAttack = () => {
  const position = state.enemy.attack();
  state.player.receiveAttack(position);
  state.lastPosition.player = position;
};

export const checkSunkShips = playerStr => state[playerStr].allSunk();

export const getBoard = playerStr => state[playerStr].board;

export const changeDirection = direction => {
  state.direction = direction;
};

initState('horizontal');
