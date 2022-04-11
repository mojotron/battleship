const View = () => {
  const parentElement = document.querySelector('.game-wrapper');

  const render = markdown => {
    parentElement.innerHTML = '';
    parentElement.insertAdjacentHTML('afterbegin', markdown);
  };

  return { render };
};

export default View();
