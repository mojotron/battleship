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
    // using at method before pop to avoid bug of popping ship if placement fails
    state.player.createShip(position, state.direction, state.ships.at(-1));
    popShip();
  } catch (error) {
    throw error;
  }
};

export const playerAttack = position => {
  try {
    state.enemy.receiveAttack(position);
    state.lastPosition.enemy = position;
  } catch (error) {
    throw error;
  }
};

export const aiAttack = () => {
  try {
    const position = state.enemy.attack();
    state.lastPosition.player = position;
    // getting data for SearchAndSink
    const { shipId, sunk } = state.player.receiveAttack(position);
    // add ship to the enemy ship detection
    state.enemy.attackReport(shipId, position, sunk || false);
  } catch (error) {
    console.log('🪃 BIG ERROR');
  }
};

export const checkSunkShips = playerStr => state[playerStr].allSunk();

export const getBoard = playerStr => state[playerStr].board;

export const changeDirection = direction => {
  state.direction = direction;
};

initState('horizontal');
