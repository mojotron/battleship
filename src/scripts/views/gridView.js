import { SHIPS } from '../config';
import generatePositions from '../generate-positions';
import shipPlacementView from './shipPlacementView';

const GridView = () => {
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
  const addPlacementHoverHandler = (gridId, state, handler) => {
    const grid = document.querySelector(`[data-${gridId}]`);
    let position;
    grid.addEventListener('mouseover', e => {
      try {
        shipPlacementView.removeInvalidShipPlacement();
        const cell = e.target.closest('.grid__cell');

        if (!cell) return;
        position = +cell.dataset.position;

        const options = {
          position,
          direction: state.direction,
          length: SHIPS[state.ships.at(-1)].length,
          boardSize: 10,
        };

        const positions = generatePositions(options);

        handler(positions);
      } catch (error) {
        shipPlacementView.removeShipPlacement();
        shipPlacementView.addInvalidShipPlacement(position);
      }
    });
  };

  const addGridMouseLeaveHandler = (id, handler) => {
    const grid = document.querySelector(`[data-${id}]`);
    grid.addEventListener('mouseleave', handler);
  };

  const addGridAddShipHandler = (id, handler) => {
    const grid = document.querySelector(`[data-${id}]`);
    grid.addEventListener('click', e => {
      const cell = e.target.closest('.grid__cell');
      if (!cell) return;
      handler(+cell.dataset.position);
    });
  };

  const addClickAttackHandler = (id, handler) => {
    const grid = document.querySelector(`[data-${id}]`);
    grid.addEventListener('click', e => {
      const cell = e.target.closest('.grid__cell');
      if (!cell) return;
      if (cell.classList.contains('cell--hit')) return;
      handler(+cell.dataset.position);
    });
  };

  return {
    createGrid,
    addPlacementHoverHandler,
    addGridMouseLeaveHandler,
    addGridAddShipHandler,
    addClickAttackHandler,
  };
};

export default GridView();
