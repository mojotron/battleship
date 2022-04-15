import { DIRECTIONS } from '../config';
import { hideShowElement } from './domHelpers';

const changeDirectionView = () => {
  const btn = document.getElementById('change-direction');

  const toggleDisplay = hideShowElement.bind(null, btn);

  const addChangeDirectionClickHandler = handler => {
    btn.addEventListener('click', e => {
      const direction =
        e.target.dataset.direction === 'horizontal' ? 'vertical' : 'horizontal';
      e.target.innerText = DIRECTIONS[direction];
      e.target.dataset.direction = direction;
      handler(direction);
    });
  };

  return { toggleDisplay, addChangeDirectionClickHandler };
};

export default changeDirectionView();
