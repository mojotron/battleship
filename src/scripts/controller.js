import '../styles/main.css';
import * as model from './model';
import newGameView from './views/newGameView';
import changeDirectionView from './views/changeDirectionView';
import gridView from './views/gridView';
import shipPlacementView from './views/shipPlacementView';
import gameView from './views/gameView';
import messageView from './views/messageView';

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
    } else {
      initShipPlacement();
    }
  } catch (error) {
    shipPlacementView.addInvalidShipPlacement(position);
  }
};

const controlChangeDirection = direction => {
  model.changeDirection(direction);
};

const initShipPlacement = () => {
  gameView.removeGrid('placement');
  gameView.renderGrid(
    gridView.createGrid('placement', model.getBoard('player'))
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
    gridView.createGrid('enemy', model.getBoard('enemy'), false)
  );
  gameView.renderGrid(gridView.createGrid('player', model.getBoard('player')));
  gridView.addClickAttackHandler('enemy', controlAttack);
};

const controlAttack = position => {
  model.playerAttack(position);
  if (model.checkSunkShips('enemy')) {
    messageView.toggleDisplay();
    messageView.changeText('Player WON!');
    alert('PLAYER WON!');
    controlNewGame();
    return;
  }
  model.aiAttack();
  if (model.checkSunkShips('player')) {
    alert('Computer WON!');
    controlNewGame();
    return;
  }
  gameView.removeGrid('enemy');
  gameView.removeGrid('player');
  gameView.renderGrid(
    gridView.createGrid('enemy', model.getBoard('enemy'), false)
  );
  gridView.addLastHitStyle('enemy', model.state.lastPosition.enemy);
  gameView.renderGrid(gridView.createGrid('player', model.getBoard('player')));
  gridView.addLastHitStyle('player', model.state.lastPosition.player);
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
  initStartGame();
};
