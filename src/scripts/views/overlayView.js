import { hideElement, showElement } from './domHelpers';

const OverlayView = () => {
  const parentElement = document.querySelector('.overlay');

  const hide = hideElement.bind(null, parentElement);

  const show = showElement.bind(null, parentElement);

  return { hide, show };
};

export default OverlayView();
