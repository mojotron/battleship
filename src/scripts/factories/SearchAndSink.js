import { shuffle } from '../halpers';

const SearchAndSink = (shipId, startPosition) => {
  const searchStart = startPosition;
  let searchPosition = startPosition;
  const shipType = shipId;
  const directions = shuffle(1, -1, 10, -10);

  const search = () => {
    searchPosition += directions.at(-1);
    return searchPosition;
  };

  const attackReport = (ship, position, sunk) => {
    if (sunk) {
      return 1;
    }
    if (ship === null) {
      directions.pop();
      searchPosition = searchStart;
    }
    if (ship === shipType) {
      searchPosition = position;
    }
    return -1;
  };

  const getShipId = () => shipType;

  return {
    getShipId,
    search,
    attackReport,
  };
};

export default SearchAndSink;
