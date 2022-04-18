import '../styles/main.css';
import * as model from './model';
import newGameView from './views/newGameView';
import changeDirectionView from './views/changeDirectionView';
import gridView from './views/gridView';
import shipPlacementView from './views/shipPlacementView';
import gameView from './views/gameView';

const controlGridHover = positions => {
  // display ship while hovering before player decide where to place it
  shipPlacementView.addShipPlacement(positions);
};

const controlAddShip = position => {
  try {
    model.addShip(position);

    if (model.shipsEmpty()) {
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
  model.state.direction = direction;
};

const initShipPlacement = () => {
  gameView.removeGrid('placement');
  gameView.renderGrid(
    gridView.createGrid('placement', model.state.player.board)
  );
  gridView.addPlacementHoverHandler('placement', model.state, controlGridHover);
  gridView.addGridAddShipHandler('placement', controlAddShip);
  gridView.addGridMouseLeaveHandler(
    'placement',
    shipPlacementView.removeShipPlacement
  );
};

const controlStartGame = () => {
  newGameView.toggleDisplay();
  changeDirectionView.toggleDisplay();

  initShipPlacement();
};

const initShipBattle = () => {
  gameView.removeGrid('placement');
  gameView.renderGrid(
    gridView.createGrid('enemy', model.state.enemy.board, false)
  );
  gameView.renderGrid(gridView.createGrid('player', model.state.player.board));
  gridView.addClickAttackHandler('enemy', controlAttack);
};

const controlAttack = position => {
  model.state.enemy.receiveAttack(position);
  if (model.state.enemy.allSunk()) {
    alert('PLAYER WON!');
    controlNewGame();
    return;
  }
  model.state.player.receiveAttack(model.state.enemy.attack());
  if (model.state.player.allSunk()) {
    alert('Computer WON!');
    controlNewGame();
    return;
  }
  gameView.removeGrid('enemy');
  gameView.removeGrid('player');
  gameView.renderGrid(
    gridView.createGrid('enemy', model.state.enemy.board, false)
  );
  gameView.renderGrid(gridView.createGrid('player', model.state.player.board));
  gridView.addClickAttackHandler('enemy', controlAttack);
};

const init = () => {
  newGameView.toggleDisplay();
  newGameView.addNewGameClickHandler(controlStartGame);
  changeDirectionView.addChangeDirectionClickHandler(controlChangeDirection);
};
init();

const controlNewGame = () => {
  gameView.removeGrid('enemy');
  gameView.removeGrid('player');
  newGameView.toggleDisplay();
  model.initState(model.state.direction);
  initShipPlacement();
};
