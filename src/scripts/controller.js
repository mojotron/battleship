import '../styles/main.css';
import { SHIP_TYPES } from './config';
import Player from './factories/Player';
import AiPlayer from './factories/AiPlayer';
import newGameView from './views/newGameView';
import changeDirectionView from './views/changeDirectionView';
import gridView from './views/gridView';
import shipPlacementView from './views/shipPlacementView';
import gameView from './views/gameView';

const state = {
  ships: [...SHIP_TYPES],
  direction: 'horizontal',
  player: Player(),
  enemy: AiPlayer(),
};

const controlGridHover = function (positions) {
  shipPlacementView.addShipPlacement(positions);
};

const controlAddShip = position => {
  try {
    state.player.createShip(position, state.direction, state.ships.at(-1));
    state.ships.splice(-1, 1);
    if (state.ships.length === 0) {
      changeDirectionView.toggleDisplay();
      initShipBattle();
      return; // TODO better exit
    }
    initShipPlacement();
  } catch (error) {
    shipPlacementView.addInvalidShipPlacement(position);
  }
};

const controlChangeDirection = function (direction) {
  state.direction = direction;
};

const initShipPlacement = () => {
  gameView.removeGrid('placement');
  gameView.renderGrid(gridView.createGrid('placement', state.player.board));
  gridView.addPlacementHoverHandler('placement', state, controlGridHover);
  gridView.addGridAddShipHandler('placement', controlAddShip);
  gridView.addGridMouseLeaveHandler(
    'placement',
    shipPlacementView.removeShipPlacement
  );
};

const controlStartGame = () => {
  newGameView.toggleDisplay();
  changeDirectionView.toggleDisplay();
  changeDirectionView.addChangeDirectionClickHandler(controlChangeDirection);
  initShipPlacement();
};

const initShipBattle = () => {
  gameView.removeGrid('placement');
  gameView.renderGrid(gridView.createGrid('enemy', state.enemy.board, false));
  gameView.renderGrid(gridView.createGrid('player', state.player.board));
  gridView.addClickAttackHandler('enemy', controlAttack);
};

const controlAttack = position => {
  state.enemy.receiveAttack(position);
  if (state.enemy.allSunk()) {
    alert('PLAYER WON!');
    controlNewGame();
    return;
  }
  state.player.receiveAttack(state.enemy.attack());
  if (state.player.allSunk()) {
    alert('Computer WON!');
    controlNewGame();
    return;
  }
  gameView.removeGrid('enemy');
  gameView.removeGrid('player');
  gameView.renderGrid(gridView.createGrid('enemy', state.enemy.board, false));
  gameView.renderGrid(gridView.createGrid('player', state.player.board));
  gridView.addClickAttackHandler('enemy', controlAttack);
};

const init = () => {
  newGameView.toggleDisplay();
  newGameView.addNewGameClickHandler(controlStartGame);
};
init();

const controlNewGame = () => {
  gameView.removeGrid('enemy');
  gameView.removeGrid('player');
  newGameView.toggleDisplay();
};
