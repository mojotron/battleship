import '../styles/main.css';
import view from './views/view';
import newGameView from './views/newGameView';
import gridView from './views/gridView';
import generatePositions from './generate-positions';
import Player from './factories/Player';

const controlNewGame = () => {
  // replace display to board picking
  const temp = Player('mojo');
  view.render(gridView.generateMarkdown(temp.board));

  const grid = document.querySelector('.grid');
  let positions;
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
        direction: 'vertical',
      };

      positions = generatePositions(options);

      positions.forEach(pos => {
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
