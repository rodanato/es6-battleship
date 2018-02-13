import './styles/main.scss';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let availablePositions = [];

const modes = {
  easy  : Infinity,
  medium: 100,
  hard  : 50
};

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
  const board = document.getElementById('battleship');
  const blocks = board.getElementsByTagName('td');

  let init = () => {
    listenToUserConfig();
    setAvailablePositions();
    setShipsRandomly();
    listenToShots();
  };

  let setAvailablePositions = () => {
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < columns.length; c++) {
        availablePositions.push(rows[r] + ',' + columns[c]);
      }
    }
  };

  let getRandomNumber = () => Math.floor((Math.random() * 9));

  let listenToUserConfig = () => {
    const easy = document.getElementById('easy');
    const medium = document.getElementById('medium');
    const hard = document.getElementById('hard');

    easy.addEventListener('click', (event) => counter = modes.easy);
    medium.addEventListener('click', (event) => counter = modes.medium);
    hard.addEventListener('click', (event) => counter = modes.hard);
  };

  let listenToShots = () => {

    for (let i = 0; i < blocks.length; i++) {
      blocks[i].addEventListener('click', (event) => {
        counter--;

        if (counter === 0) {
          alert('game over, you lost');
        } else {
          console.log(counter);
          let column = event.target.dataset.column;
          let row = event.target.parentElement.dataset.row;
          let position = row + ',' + column;

          let hitSomeone = lookIfHitSomeone(position);

          if (hitSomeone) {
            saveHitOnShip(position);

            if (shipHasBeenShinked(position)) {
              event.srcElement.classList.add('hit');
              alert('ship shinked')
            } else {
              event.srcElement.classList.add('hit');
            }

            if (allShipsHaveBeenRemoved()) alert('game over, you won');
          }
        }
      });
    }
  };

  let allShipsHaveBeenRemoved = () => {
    return ships.every(ship => ship.size === ship.hitCount);
  };

  let lookIfHitSomeone = (position) => {
    return !availablePositions.includes(position);
  };

  let lookIfAllPositionsAreAvailable = (fullPosition) => {
    const separator = fullPosition.indexOf(':');
    const column = fullPosition.slice(0, 1);
    const start = fullPosition.slice(separator-1, separator);
    const end = fullPosition.slice(separator+3, fullPosition.length);

    let positionsList = [];

    for (let i = start; i <= end; i++) {
      if (availablePositions.includes(column + ',' + i)) {
        positionsList.push(column + ',' + i)
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


  let shipHasBeenShinked = (position) => {
    return ships.some(ship => ship.size === ship.hitCount && ship.position.includes(position));
  };

  let saveShipPosition = (ship) => {
    const randomRow = rows[getRandomNumber()];
    const randomColumn = columns[getRandomNumber()];
    const randomPosition = randomRow + ',' + randomColumn;
    const fullPosition = randomPosition + ':' + randomRow + ',' + (randomColumn + ship.size - 1);
    const positionsList = lookIfAllPositionsAreAvailable(fullPosition);

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
