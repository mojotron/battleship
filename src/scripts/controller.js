import '../styles/main.css';
import { SHIPS, SHIP_TYPES } from './config';
import Player from './factories/Player';
import generatePositions from './generate-positions';
import changeDirectionView from './views/changeDirectionView';
import gridView from './views/gridView';

const state = {
  ships: [...SHIP_TYPES],
  direction: 'horizontal',
};

const gameWrapper = document.querySelector('.game-wrapper');
const temp = Player();

const removeShipPlacement = function () {
  document
    .querySelectorAll('.ship-placement')
    .forEach(node => node.classList.remove('ship-placement'));
};

const removeInvalidShipPlacement = function () {
  document
    .querySelector('.invalid-ship-placement')
    ?.classList.remove('invalid-ship-placement');
};

const addInvalidShipPlacement = function (position) {
  removeInvalidShipPlacement();
  document
    .querySelector(`[data-position="${position}"]`)
    .classList.add('invalid-ship-placement');
};

const createGridHoverEventHandler = function (id, stateShips, handler) {
  const grid = document.querySelector(`[data-${id}]`);
  let position;
  grid.addEventListener('mouseover', e => {
    try {
      removeInvalidShipPlacement();
      const cell = e.target.closest('.grid__cell');

      if (!cell) return;
      position = +cell.dataset.position;

      const options = {
        position,
        direction: state.direction,
        length: SHIPS[stateShips.at(-1)].length,
        boardSize: 10,
      };

      const positions = generatePositions(options);

      handler(positions);
    } catch (error) {
      removeShipPlacement();
      addInvalidShipPlacement(position);
    }
  });
};

const createGridMouseLeaveHandler = function (id, handler) {
  const grid = document.querySelector(`[data-${id}]`);
  grid.addEventListener('mouseleave', handler);
};

const controlGridHover = function (positions) {
  removeShipPlacement();
  positions.forEach(position => {
    document
      .querySelector([`[data-position="${position}"]`])
      .classList.add('ship-placement');
  });
};

const createGridAddShipHandler = function (id, handler) {
  const grid = document.querySelector(`[data-${id}]`);
  grid.addEventListener('click', e => {
    const cell = e.target.closest('.grid__cell');
    if (!cell) return;
    handler(+cell.dataset.position);
  });
};

const controlAddShip = position => {
  try {
    temp.createShip(position, state.direction, state.ships.at(-1));
    state.ships.splice(-1, 1);
    document.querySelector(`[data-placement]`).remove();
    gameWrapper.insertAdjacentHTML(
      'afterbegin',
      gridView.createGrid('placement', temp.board)
    );

    if (state.ships.length === 0) {
      changeDirectionView.toggleDisplay();
      alert('DONE');
    }

    createGridHoverEventHandler('placement', state.ships, controlGridHover);
    createGridAddShipHandler('placement', controlAddShip);
    createGridMouseLeaveHandler('placement', removeShipPlacement);
  } catch (error) {
    gridView.addInvalidShipPlacement(position);
  }
};

const controlChangeDirection = function (direction) {
  state.direction = direction;
};

// init
gameWrapper.insertAdjacentHTML(
  'afterbegin',
  gridView.createGrid('placement', temp.board)
);
createGridHoverEventHandler('placement', state.ships, controlGridHover);
createGridAddShipHandler('placement', controlAddShip);
createGridMouseLeaveHandler('placement', removeShipPlacement);
changeDirectionView.toggleDisplay();
changeDirectionView.addChangeDirectionClickHandler(controlChangeDirection);
