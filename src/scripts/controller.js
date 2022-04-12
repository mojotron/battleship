import '../styles/main.css';
import { SHIPS } from './config';
import Player from './factories/Player';
import generatePositions from './generate-positions';

const gameWrapper = document.querySelector('.game-wrapper');
const ships = ['patrol', 'submarine', 'destroyer', 'battleship', 'carrier'];
const temp = Player();

const fillGrid = function (data) {
  return data
    .map(
      (ele, i) => `
          <div 
            class="grid__cell ${ele.hasShip ? 'cell--ship' : ''}"
            data-position="${i}"
          ></div>`
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

const createGridHoverEventHandler = function (id, handler) {
  const grid = document.querySelector(`[data-${id}]`);
  grid.addEventListener('mouseover', e => {
    try {
      const cell = e.target.closest('.grid__cell');
      if (!cell) return;
      const options = {
        position: +cell.dataset.position,
        direction: 'horizontal',
        length: SHIPS[ships.at(-1)].length,
        boardSize: 10,
      };

      const positions = generatePositions(options);
      handler(positions);
    } catch (error) {
      console.log(error.message);
      removeShipPlacement();
    }
  });
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
    temp.createShip(position, 'horizontal', ships.at(-1));
    ships.splice(-1, 1);
    document.querySelector(`[data-placement]`).remove();
    gameWrapper.insertAdjacentHTML(
      'afterbegin',
      createGrid('placement', temp.board)
    );
    if (ships.length === 0) alert('DONE');
    createGridHoverEventHandler('placement', controlGridHover);
    createGridAddShipHandler('placement', controlAddShip);
  } catch (error) {
    console.log(error.message);
  }
};

gameWrapper.insertAdjacentHTML(
  'afterbegin',
  createGrid('placement', temp.board)
);

createGridHoverEventHandler('placement', controlGridHover);
createGridAddShipHandler('placement', controlAddShip);
