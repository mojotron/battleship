const NewGameView = () => {
  const generateMarkdown = (message = '') => `
      <div class="new-game">
        <p class="new-game__message">${message}</p>
        <button  ton class="btn" id="new-game" type="button">New Game</button>
      </div>
    `;

  const addStartGameClickHandler = handler => {
    const btn = document.querySelector('#new-game');
    btn.addEventListener('click', () => {
      handler();
    });
  };

  return { generateMarkdown, addStartGameClickHandler };
};

export default NewGameView();
