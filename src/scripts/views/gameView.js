const GameView = () => {
  const parentElement = document.querySelector('.game-wrapper');

  const removeGrid = id => {
    parentElement.querySelector(`[data-${id}`)?.remove();
  };

  const renderGrid = markdown => {
    parentElement.insertAdjacentHTML('afterbegin', markdown);
  };

  return { removeGrid, renderGrid };
};
export default GameView();
