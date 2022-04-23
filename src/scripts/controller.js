import '../styles/main.css';
import * as model from './model';
import newGameView from './views/newGameView';
import changeDirectionView from './views/changeDirectionView';
import gridView from './views/gridView';
import shipPlacementView from './views/shipPlacementView';
import gameView from './views/gameView';
import messageView from './views/messageView';
import overlayView from './views/overlayView';

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

const controlGridBattleRender = (id, ships) => {
  gameView.removeGrid(id);
  gameView.renderGrid(gridView.createGrid(id, model.getBoard(id), ships));
  gridView.addLastHitStyle(id, model.state.lastPosition[id]);
};

const controlBattleRender = () => {
  controlGridBattleRender('enemy', false);
  controlGridBattleRender('player');
};

const initShipBattle = () => {
  gameView.removeGrid('placement');
  controlGridBattleRender('enemy', false);
  controlGridBattleRender('player');
  gridView.addClickAttackHandler('enemy', controlAttack);
  gridView.addCurrentPlayerStyle('enemy');
};

const controlAttack = async position => {
  try {
    model.playerAttack(position);
    controlBattleRender();
    gridView.addCurrentPlayerStyle('player');
    await new Promise(resolve => {
      setTimeout(resolve, Math.random() * 1000 + 1000);
    });
    model.aiAttack();
    controlBattleRender();
    gridView.addCurrentPlayerStyle('enemy');
    gridView.addClickAttackHandler('enemy', controlAttack);

    if (model.checkSunkShips('enemy')) {
      messageView.show();
      messageView.changeText('Player WON!');
      newGameView.toggleDisplay();
      overlayView.show();
      return;
    }
    if (model.checkSunkShips('player')) {
      messageView.show();
      messageView.changeText('Computer WON!');
      newGameView.toggleDisplay();
      overlayView.show();
    }
  } catch (error) {
    console.log(error.message);
  }
};

const controlNewGame = () => {
  gameView.removeGrid('enemy');
  gameView.removeGrid('player');
  messageView.hide();
  overlayView.hide();
  newGameView.toggleDisplay();
  changeDirectionView.toggleDisplay();
  model.initState(model.state.direction);
  initShipPlacement();
};

const init = () => {
  newGameView.toggleDisplay();
  newGameView.addNewGameClickHandler(controlNewGame);
  changeDirectionView.addChangeDirectionClickHandler(controlChangeDirection);
};

init();
