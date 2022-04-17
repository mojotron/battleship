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

initState('horizontal');
