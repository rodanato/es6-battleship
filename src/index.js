import './styles/main.scss';

const modes = {
  easy  : Infinity,
  medium: 100,
  hard  : 50
};
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const alignments = ['horizontal', 'vertical'];

let availablePositions = [];
let missedShots = [];
let counter = 0;
let ships = [
  {
    size: 4,
    position: '',
    hitCount: 0,
    positionsList: []
  },
  {
    size: 3,
    position: '',
    hitCount: 0,
    positionsList: []
  },
  {
    size: 3,
    position: '',
    hitCount: 0,
    positionsList: []
  },
  {
    size: 2,
    position: '',
    hitCount: 0,
    positionsList: []
  },
  {
    size: 2,
    position: '',
    hitCount: 0,
    positionsList: []
  },
  {
    size: 2,
    position: '',
    hitCount: 0,
    positionsList: []
  },
  {
    size: 1,
    position: '',
    hitCount: 0,
    positionsList: []
  },
  {
    size: 1,
    position: '',
    hitCount: 0,
    positionsList: []
  },
  {
    size: 1,
    position: '',
    hitCount: 0,
    positionsList: []
  },
  {
    size: 1,
    position: '',
    hitCount: 0,
    positionsList: []
  }
];

const InitModule = (() => {
  const board  = document.getElementsByClassName('grid')[0];
  const configLayer   = document.getElementsByClassName('config-layer');
  const easy   = document.getElementById('easy');
  const medium = document.getElementById('medium');
  const hard   = document.getElementById('hard');

  let init = () => {
    addListeners();
    setAvailablePositions();
    setShipsRandomly();
  };

  let setAvailablePositions = () => {
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < columns.length; c++) {
        availablePositions.push(rows[r] + ',' + columns[c]);
      }
    }
  };

  let getRandomNumber = (max) => Math.floor((Math.random() * (max - 1)));

  let addListeners = () => {
    easy.addEventListener('click', () => hideConfig.call(null, modes.easy));
    medium.addEventListener('click', () => hideConfig.call(null, modes.medium));
    hard.addEventListener('click', () => hideConfig.call(null, modes.hard));
    board.addEventListener('click', (event) => shotAction.call(null, event));
  };

  let hideConfig = (mode) => {
    counter = mode;
    configLayer[0].classList.add('hidden');
    configLayer[1].classList.add('hidden');
  };

  let shotAction = () => {
    counter--;

    if (counter === 0) {
      alert('game over, you lost');
    } else {
      let e = event;
      let column = e.target.dataset.column;
      let row = e.target.parentElement.dataset.row;
      let position = row + ',' + column;

      if (hitSomeone(position)) {
        saveHitOnShip(position);
        e.srcElement.classList.add('hit');
        if (shipHasBeenSinked(position)) alert('ship sinked');
        if (allShipsHaveBeenRemoved()) alert('game over, you won');
      } else {
        if (missedShots.includes(position)) counter++;

        missedShots.push(position);
        e.srcElement.classList.add('missed');
      }
    }
  };

  let allShipsHaveBeenRemoved = () => {
    return ships.every(ship => ship.size === ship.hitCount);
  };

  let hitSomeone = (position) => {
    return !availablePositions.includes(position);
  };

  let lookIfAllPositionsAreAvailable = (fullPosition, randomAlignment) => {
    const separator   = fullPosition.indexOf(':');
    const rowStart    = fullPosition.slice(0, 1);
    const rowEnd      = fullPosition.slice(separator+1, separator+2);
    const columnStart = fullPosition.slice(separator-1, separator);
    const columnEnd   = fullPosition.slice(separator+3, fullPosition.length);
    let positionsList = [];

    if (randomAlignment === 'horizontal') {
      for (let i = columnStart; i <= columnEnd; i++) {
        if (availablePositions.includes(rowStart + ',' + i)) positionsList.push(rowStart + ',' + i);
      }
    }
    if (randomAlignment === 'vertical') {
      let rowStartNumber = rows.indexOf(rowStart);
      let rowEndNumber = rows.indexOf(rowEnd);

      if (rowStartNumber > rowEndNumber) {
        let rowStart = rowStartNumber;

        rowStartNumber = rowEndNumber;
        rowEndNumber   = rowStart;
      }

      for (let i = rowStartNumber; i <= rowEndNumber; i++) {
        if (availablePositions.includes(rows[i] + ',' + columnStart)) positionsList.push(rows[i] + ',' + columnStart);
      }
    }

    return positionsList;
  };

  let setShipsRandomly = () => {
    ships
      .map(ship => saveShipPosition(ship));
  };

  let saveHitOnShip = (position) => {
    ships.some(ship => {
      if (ship.positionsList.includes(position)) ship.hitCount++;
    })
  };


  let shipHasBeenSinked = (position) => {
    return ships.some(ship => ship.size === ship.hitCount && ship.position.includes(position));
  };

  let saveShipPosition = (ship) => {
    const randomRow       = rows[getRandomNumber(10)];
    const randomColumn    = columns[getRandomNumber(10)];
    const randomAlignment = alignments[getRandomNumber(3)];
    const startPosition = randomRow + ',' + randomColumn;
    const endPosition   = (randomAlignment === 'horizontal') ? randomRow + ',' + (randomColumn + ship.size - 1) : rows[getRandomNumber(10 + ship.size - 1)] + ',' + randomColumn;
    const fullPosition  = startPosition + ':' + endPosition;

    const positionsList = lookIfAllPositionsAreAvailable(fullPosition, randomAlignment);

    if (positionsList.length === ship.size) {
      ship.position = fullPosition;
      ship.positionsList = positionsList;

      positionsList.forEach(position => {
        let index = availablePositions.indexOf(position);
        availablePositions.splice(index, 1);
      });

      return ship;
    } else {
      saveShipPosition(ship);
    }
  };

  return {init: init};
})();

InitModule.init();
