import React from 'react';

let columnClass = '';

let ColumnsGroup = ({columns, action, row, availablePositions, missedShots}) => {
  return columns
    .map(column => {
      console.log(availablePositions);
      if (missedShots.includes(row + ',' + column)) {
        columnClass = 'missed';
      } else if (availablePositions.includes(row + ',' + column)) {
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
};

export {ColumnsGroup};