import { hideElement, showElement } from './domHelpers';

const MessageView = () => {
  const parentElement = document.querySelector('.game-message');
  const textElement = parentElement.querySelector('.game-message__text');

  const hide = hideElement.bind(null, parentElement);

  const show = showElement.bind(null, parentElement);

  const changeText = text => {
    textElement.innerText = text;
  };

  return { hide, show, changeText };
};

export default MessageView();
