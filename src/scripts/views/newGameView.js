import { hideShowElement } from './domHelpers';

const NewGameView = () => {
  const btn = document.getElementById('new-game');

  const addNewGameClickHandler = handler => {
    btn.addEventListener('click', handler);
  };

  const toggleDisplay = hideShowElement.bind(null, btn);

  return { addNewGameClickHandler, toggleDisplay };
};

export default NewGameView();
