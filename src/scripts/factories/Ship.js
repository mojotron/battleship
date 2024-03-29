import { SHIPS } from '../config';

const Ship = (shipType, positionArr) => {
  let state;

  const setState = () =>
    positionArr.map(position => ({ position, isHit: false }));

  const hit = position => {
    const block = state.find(ele => ele.position === position);
    if (!block) throw new Error('☢️ Invalid position value');
    if (block.isHit) throw new Error('☢️ Position already got hit');
    block.isHit = true;
    return block.isHit;
  };

  const isSunk = () => state.every(ele => ele.isHit === true);

  const init = () => {
    if (SHIPS[shipType.trim().toLowerCase()] === undefined)
      throw new Error('☢️ Invalid ship type');
    if (SHIPS[shipType].length !== positionArr.length)
      throw new Error('☢️ Invalid position length for ship type');
    state = setState();
  };

  init();

  return { hit, isSunk };
};

export default Ship;
