const ShipPlacementView = () => {
  const generateMarkup = () => `
      <div class="ship-placement">
        <button class="btn" id="change-direction">horizontal</button>
      </div>
    `;

  const addDirectionClickHandler = handler => {
    const btn = document.querySelector('#change-direction');
    btn.addEventListener('click', e => {
      const direction =
        e.target.innerText === 'horizontal' ? 'vertical' : 'horizontal';
      e.target.innerText = direction;
      handler(direction);
    });
  };

  return { generateMarkup, addDirectionClickHandler };
};

export default ShipPlacementView();
