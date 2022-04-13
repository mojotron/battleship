import '../styles/main.css';
import { SHIPS, DIRECTIONS } from './config';
import Player from './factories/Player';
import generatePositions from './generate-positions';

const state = {
  direction: 'horizontal',
};

const gameWrapper = document.querySelector('.game-wrapper');
const ships = ['patrol', 'submarine', 'destroyer', 'battleship', 'carrier'];
const temp = Player();

/* change direction btn */
const changeDirectionClickHandler = function (handler) {
  const btn = document.getElementById('change-direction');
  btn.addEventListener('click', e => {
    const direction =
      e.target.dataset.direction === 'horizontal' ? 'vertical' : 'horizontal';
    e.target.innerText = DIRECTIONS[direction];
    e.target.dataset.direction = direction;
    handler(direction);
  });
};
const controlChangeDirection = function (direction) {
  state.direction = direction;
};

changeDirectionClickHandler(controlChangeDirection);

const fillGrid = function (data) {
  return data
    .map(
      (ele, i) => `
          <div 
            class="grid__cell ${ele.hasShip ? 'cell--ship' : ''}"
            data-position="${i}">
          </div>`
    )
    .join('');
};
const createGrid = function (id, data) {
  return `
    <div class="grid" data-${id}>
      ${fillGrid(data)}
    </div>
  `;
};

const removeShipPlacement = () =>
  document
    .querySelectorAll('.ship-placement')
    .forEach(node => node.classList.remove('ship-placement'));

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

const createGridHoverEventHandler = function (id, handler) {
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
        length: SHIPS[ships.at(-1)].length,
        boardSize: 10,
      };

      const positions = generatePositions(options);

      handler(positions);
    } catch (error) {
      console.log(error.message);
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
    temp.createShip(position, state.direction, ships.at(-1));
    ships.splice(-1, 1);
    document.querySelector(`[data-placement]`).remove();
    gameWrapper.insertAdjacentHTML(
      'afterbegin',
      createGrid('placement', temp.board)
    );

    if (ships.length === 0) alert('DONE');

    createGridHoverEventHandler('placement', controlGridHover);
    createGridAddShipHandler('placement', controlAddShip);
    createGridMouseLeaveHandler('placement', removeShipPlacement);
  } catch (error) {
    console.log(error.message);
    addInvalidShipPlacement(position);
  }
};

gameWrapper.insertAdjacentHTML(
  'afterbegin',
  createGrid('placement', temp.board)
);

createGridHoverEventHandler('placement', controlGridHover);
createGridAddShipHandler('placement', controlAddShip);
createGridMouseLeaveHandler('placement', removeShipPlacement);
