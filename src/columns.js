import React from 'react';

let columnClass = '';

class ColumnsGroup extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return this.props.columns
      .map(column => {
        console.log(this.props.availablePositions);
        console.log(this.props.missedShots);
        if (this.props.missedShots.includes(row + ',' + column)) {
          columnClass = 'missed';
        } else if (this.props.availablePositions.includes(row + ',' + column)) {
          columnClass = 'hit';
        } else {
          columnClass = '';
        }
        return column;
      })
      .map((column, i) => {
        return (
          <td data-column={column}
              key={i}
              className={columnClass}
              onClick={() => {
                action(column, row)
              }}>
          </td>
        );
      });
  }
}

export {ColumnsGroup};
