import { SHIP_TYPES } from './config';
import Player from './factories/Player';
import AiPlayer from './factories/AiPlayer';

export const state = {
  ships: [],
  direction: '',
  player: {},
  enemy: {},
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

initState('horizontal');
