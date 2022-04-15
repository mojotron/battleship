import '../styles/main.css';
import { SHIP_TYPES } from './config';
import newGameView from './views/newGameView';
import Player from './factories/Player';
import changeDirectionView from './views/changeDirectionView';
import gridView from './views/gridView';
import shipPlacementView from './views/shipPlacementView';

const state = {
  ships: [...SHIP_TYPES],
  direction: 'horizontal',
};

const gameWrapper = document.querySelector('.game-wrapper');
const temp = Player();

const controlGridHover = function (positions) {
  shipPlacementView.addShipPlacement(positions);
};

const controlAddShip = position => {
  try {
    temp.createShip(position, state.direction, state.ships.at(-1));
    state.ships.splice(-1, 1);
    if (state.ships.length === 0) {
      changeDirectionView.toggleDisplay();
      alert('DONE');
    }
    initShipPlacement();
  } catch (error) {
    shipPlacementView.addInvalidShipPlacement(position);
  }
};

const controlChangeDirection = function (direction) {
  state.direction = direction;
};

// init
const initShipPlacement = () => {
  document.querySelector(`[data-placement]`)?.remove(); // TODO
  gameWrapper.insertAdjacentHTML(
    'afterbegin',
    gridView.createGrid('placement', temp.board)
  );
  gridView.addPlacementHoverHandler('placement', state, controlGridHover);
  gridView.addGridAddShipHandler('placement', controlAddShip);
  gridView.addGridMouseLeaveHandler(
    'placement',
    shipPlacementView.removeShipPlacement
  );
};

const controlNewGame = () => {
  newGameView.toggleDisplay();
  changeDirectionView.toggleDisplay();
  changeDirectionView.addChangeDirectionClickHandler(controlChangeDirection);
  initShipPlacement();
};

const init = () => {
  newGameView.toggleDisplay();
  newGameView.addNewGameClickHandler(controlNewGame);
};
init();
