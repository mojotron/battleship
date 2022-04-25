import { shuffle } from '../helpers';

const SearchAndSink = (shipId, startPosition) => {
  const searchStart = startPosition;
  let searchPosition = startPosition;
  const shipType = shipId;
  const directions = shuffle(1, -1, 10, -10);

  const search = () => {
    searchPosition += directions.at(-1);
    return searchPosition;
  };

  const changeDirection = () => {
    searchPosition = searchStart;
    if (directions.length > 0) directions.pop();
  };

  const getShipId = () => shipType;

  return {
    getShipId,
    search,
    changeDirection,
  };
};

export default SearchAndSink;
