const ShipPlacementView = () => {
  const addShipPlacement = positions => {
    removeShipPlacement();
    positions.forEach(position => {
      document
        .querySelector([`[data-position="${position}"]`])
        .classList.add('ship-placement');
    });
  };
  const removeShipPlacement = () => {
    document
      .querySelectorAll('.ship-placement')
      .forEach(node => node.classList.remove('ship-placement'));
  };

  const removeInvalidShipPlacement = () => {
    document
      .querySelector('.invalid-ship-placement')
      ?.classList.remove('invalid-ship-placement');
  };

  const addInvalidShipPlacement = position => {
    removeInvalidShipPlacement();
    document
      .querySelector(`[data-position="${position}"]`)
      .classList.add('invalid-ship-placement');
  };

  return {
    addShipPlacement,
    removeShipPlacement,
    removeInvalidShipPlacement,
    addInvalidShipPlacement,
  };
};

export default ShipPlacementView();
