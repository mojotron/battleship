import '../styles/main.css';
import view from './views/view';
import newGameView from './views/newGameView';
import gridView from './views/gridView';
import generatePositions from './generate-positions';
import Player from './factories/Player';
import shipPlacementView from './views/shipPlacementView';

const state = {
  player1: null,
  player2: null,
  currentPlayer: null,

  placement: {
    ships: ['patrol', 'submarine', 'destroyer', 'battleship', 'carrier'],
    direction: 'horizontal',
    positions: [],
  },
};

const controlNewGame = () => {
  // replace display to board picking
  const markup =
    gridView.generateMarkdown(state.player1.board) +
    shipPlacementView.generateMarkup();
  view.render(markup);

  const controlChangeDirection = dir => {
    state.placement.direction = dir;
  };

  shipPlacementView.addDirectionClickHandler(controlChangeDirection);

  const grid = document.querySelector('.grid');

  grid.addEventListener('mouseover', e => {
    try {
      document
        .querySelectorAll('.ship-placement')
        .forEach(ele => ele.classList.remove('ship-placement'));

      const cell = e.target.closest('.grid__cell');
      if (!cell) return;

      const options = {
        position: +cell.dataset.position,
        length: 5,
        boardSize: 10,
        direction: state.placement.direction,
      };

      state.placement.positions = generatePositions(options);

      state.placement.positions.forEach(pos => {
        document
          .querySelector(`[data-position="${pos}"]`)
          .classList.add('ship-placement');
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};

const init = () => {
  state.player1 = Player();
  view.render(newGameView.generateMarkdown());
  newGameView.addStartGameClickHandler(controlNewGame);
};

init();

// GAME flow
// on load display loading screen
// -> after selecting new game display grit for ship placement
// -> after user places all ships
// -> display 2 grids and start game loop

// modal
