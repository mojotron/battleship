import { SHIPS } from '../config';
import generatePositions from '../generate-positions';

const GridView = () => {
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

  const fillGrid = data =>
    data
      .map(
        (ele, i) => `
            <div 
              class="grid__cell ${ele.hasShip ? 'cell--ship' : ''}"
              data-position="${i}">
            </div>`
      )
      .join('');

  const createGrid = (id, data) =>
    `<div class="grid" data-${id}>
        ${fillGrid(data)}
      </div>`;

  // Event handlers
  const addPlacementHoverHandler = (gridId, stateShips, handler) => {
    const grid = document.querySelector(`[data-${gridId}]`);
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
  return {
    createGrid,
    addPlacementHoverHandler,
  };
};

export default GridView();
