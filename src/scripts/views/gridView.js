const GridView = () => {
  const generateGridCells = data =>
    data
      .map((_, i) => `<div class="grid__cell" data-position="${i}"></div>`)
      .join('');

  const generateMarkdown = data =>
    `
    <div class="game-board-grid">
    <div class="grid">${generateGridCells(data)}</div>
    </div>`;

  return { generateMarkdown };
};

export default GridView();
