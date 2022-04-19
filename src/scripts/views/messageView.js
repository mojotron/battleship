import { hideShowElement } from './domHelpers';

const MessageView = () => {
  const parentElement = document.querySelector('.game-message');
  const textElement = parentElement.querySelector('.game-message__text');

  const toggleDisplay = hideShowElement.bind(null, parentElement);

  const changeText = text => {
    textElement.innerText = text;
  };

  return { toggleDisplay, changeText };
};

export default MessageView();
