import React, {Component} from "react";
import Grid from './components/grid';
import Config from './components/config';

class App extends Component {
  alignments = ['horizontal', 'vertical'];
  columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  rows    = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  modes = {
    easy  : Infinity,
    medium: 100,
    hard  : 50
  };
  counter = 0;

  constructor(props) {
    super(props);

    this.state = {
      availablePositions: [],
      hits              : [],
      missedShots       : [],
      playing: false,
      ships             : [
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
      ]
  };
  }

  componentWillMount() {
    let newPositions = this.setAvailablePositions();
    this.updateAvailablePositions(newPositions);
  }

  updateAvailablePositions(positions) {
    this.setState({
      availablePositions: positions
    });
  }

  componentDidMount() {
    this.setShipsRandomly(this.state.ships);
  }

  chooseMode(mode) {
    this.counter = this.modes[mode];
    this.setState({
      playing: true
    });
  }

  cleanAvailablePositions(positionList, availablePositions) {
    let newAvailablePositions = availablePositions;

    positionList
      .forEach(position => {
        let index = newAvailablePositions.indexOf(position);
        newAvailablePositions.splice(index, 1);
      });

    return newAvailablePositions;
  }

  getRandomNumber(max) {
    return Math.floor((Math.random() * (max - 1)));
  }

  generateShipPosition(ship) {
    const randomRow       = this.rows[this.getRandomNumber(10)];
    const randomColumn    = this.columns[this.getRandomNumber(10)];
    const randomAlignment = this.alignments[this.getRandomNumber(3)];

    const startPosition = randomRow + ',' + randomColumn;
    const endPosition   = (randomAlignment === 'horizontal') ? randomRow + ',' + (randomColumn + ship.size - 1) : this.rows[this.getRandomNumber(10 + ship.size - 1)] + ',' + randomColumn;
    const fullPosition  = startPosition + ':' + endPosition;
    const positionsList = this.lookIfAllPositionsAreAvailable(fullPosition, randomAlignment);

    if (positionsList.length === ship.size) {
      ship.position = fullPosition;
      ship.positionsList = positionsList;

      this.updateAvailablePositions(this.cleanAvailablePositions(positionsList, this.state.availablePositions));

      return ship;
    } else {
      this.generateShipPosition(ship);
    }
  }

  lookIfAllPositionsAreAvailable(fullPosition, randomAlignment) {
    const separator   = fullPosition.indexOf(':');
    const rowStart    = fullPosition.slice(0, 1);
    const rowEnd      = fullPosition.slice(separator+1, separator+2);
    const columnStart = fullPosition.slice(separator-1, separator);
    const columnEnd   = fullPosition.slice(separator+3, fullPosition.length);
    let positionsList = [];

    if (randomAlignment === 'horizontal') {
      for (let i = columnStart; i <= columnEnd; i++) {
        if (this.state.availablePositions.includes(rowStart + ',' + i)) positionsList.push(rowStart + ',' + i);
      }
    }
    if (randomAlignment === 'vertical') {
      let rowStartNumber = this.rows.indexOf(rowStart);
      let rowEndNumber = this.rows.indexOf(rowEnd);

      if (rowStartNumber > rowEndNumber) {
        let rowStart = rowStartNumber;

        rowStartNumber = rowEndNumber;
        rowEndNumber   = rowStart;
      }

      for (let i = rowStartNumber; i <= rowEndNumber; i++) {
        if (this.state.availablePositions.includes(this.rows[i] + ',' + columnStart)) positionsList.push(this.rows[i] + ',' + columnStart);
      }
    }

    return positionsList;
  }

  hitSomeone(position) {
    return !this.state.availablePositions.includes(position);
  }

  saveHit(position) {
    this.setState(state => ({
      hits: [...state.hits, position]
    }));
  }

  saveHitOnShip(position) {
    let newShips = this.state.ships;

    newShips.some(ship => {
      if (ship.positionsList.includes(position)) ship.hitCount++;
    });

    this.setState({
      ships: newShips
    });
  }

  setAvailablePositions() {
    let positions = [];

    for (let r = 0; r < this.rows.length; r++) {
      for (let c = 0; c < this.columns.length; c++) {
        positions.push(this.rows[r] + ',' + this.columns[c]);
      }
    }

    return positions;
  }

  setShipsRandomly(ships) {
    let newShipsState = ships;

    ships
      .map(ship => this.generateShipPosition(ship));

    this.setState({
      ships: newShipsState
    });
  }

  shipHasBeenSinked(position) {
    return this.state.ships.some(ship => ship.size === ship.hitCount && ship.position.includes(position));
  }

  allShipsHaveBeenRemoved() {
    return this.state.ships.every(ship => ship.size === ship.hitCount);
  }

  finishGame(finalText) {
    alert('game over, you ' + finalText);
  }

  pushPositionToMissedShots(position) {
    this.setState(state => ({
      missedShots: [...state.missedShots, position]
    }));
  }

  shotAction(row, column) {
    if (this.state.playing) {
      this.counter--;

      if (this.counter === 0) {
        this.finishGame('lost');
      } else {
        let position = row + ',' + column;

        if (this.hitSomeone(position)) {
          this.saveHit(position);
          this.saveHitOnShip(position);
            if (this.shipHasBeenSinked(position)) alert('ship sinked');
            if (this.allShipsHaveBeenRemoved()) this.finishGame('won');
        } else {
          if (this.state.missedShots.includes(position)) this.counter++;
          this.pushPositionToMissedShots(position);
        }
      }
    }
  }

  render() {
    return (
      <main>
        <Config onModeSelection={(mode) => this.chooseMode(mode)}
                playing={this.state.playing}/>
        <Grid rows={this.rows}
              columns={this.columns}
              availablePositions={this.state.availablePositions}
              missedShots={this.state.missedShots}
              hits={this.state.hits}
              shotAction={(row, column) => this.shotAction(row, column)}
        />
      </main>
    );
  }
}

export default App;
